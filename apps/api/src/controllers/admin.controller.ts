import { Request, Response } from "express";
import db from "../config/db";
import { contact, experience, profile, projects } from "../models";
import cloudinary from "../utils/cloud";
import { eq } from "drizzle-orm";
import { 
  COMMON_RESPONSE,
  CREATE_CONTACT_REQUEST,
  CREATE_EXPERIENCE_REQUEST,
  CREATE_PROFILE_REQUEST, 
  CREATE_PROFILE_RESPONSE, 
  CREATE_PROJECT_REQUEST, 
  CREATE_SKILL_REQUEST, 
  CREATE_SKILL_RESPONSE, 
  DELETE_EXPERIENCE_REQUEST, 
  DELETE_SKILL_RESPONSE, 
  Project, 
  READ_PROFILE_RESPONSE, 
  READ_SKILL_RESPONSE, 
  UPDATE_EXPERIENCE_REQUEST, 
  UPDATE_PROFILE_REQUEST, 
  UPDATE_PROFILE_RESPONSE, 
  UPDATE_SKILL_REQUEST
} from "@repo/types";
import fs from "fs";
import { projectUpload } from "../utils/upload";
import { skills } from "../models/skills.model";
import { sendEmail } from "../utils/email";
import { adminTemplate, userTemplate } from "../utils/emailTemplates";

// Helper to delete local files after upload
const cleanLocalFiles = (files: any) => {
  if (files?.profilePic?.[0]?.path) fs.unlinkSync(files.profilePic[0].path);
  if (files?.cv?.[0]?.path) fs.unlinkSync(files.cv[0].path);
};


// ✅ Create Profile
export const createProfile = async (
  req: Request<{}, {}, CREATE_PROFILE_REQUEST>,
  res: Response<CREATE_PROFILE_RESPONSE>
) => {
  try {
    // Check if profile already exists (ONLY ONE profile allowed)
    const existingProfile = await db.select().from(profile);
    if (existingProfile.length > 0) {
      cleanLocalFiles(req.files);
      return res.status(400).json({ message: "Profile already exists. Only one profile allowed. Please update the existing profile." });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (!files?.profilePic?.[0] || !files?.cv?.[0]) {
      cleanLocalFiles(req.files);
      return res.status(400).json({ message: "Both profile image and CV are required" });
    }

    // Upload to Cloudinary
    const profilePicUpload = await cloudinary.uploader.upload(files.profilePic[0]!.path, { folder: "profile" });
    const cvUpload = await cloudinary.uploader.upload(files.cv[0]!.path, { folder: "resume", resource_type: "raw" });

    // Clean local files
    cleanLocalFiles(req.files);

    const {
      name, title, bio, journey, work, dob, location, email, mobile, language,
      yearExp, projectsCompleted, technologies, happyClients, githubURL, linkedin
    } = req.body;

    await db.insert(profile).values({
      name: String(name),
      title: String(title),
      bio: String(bio),
      journey: String(journey),
      work: String(work),
      dob: String(dob),
      location: String(location),
      email: String(email),
      mobile: String(mobile),
      language: String(language),
      yearExp: Number(yearExp),
      projectsCompleted: Number(projectsCompleted),
      technologies: Number(technologies),
      happyClients: Number(happyClients),
      profileImage: profilePicUpload.secure_url,
      cv: cvUpload.secure_url,
      githubURL: String(githubURL),
      linkedin: String(linkedin),

    });

    return res.status(201).json({ message: "Profile created successfully" });

  } catch (error) {
    cleanLocalFiles(req.files);
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 👀 READ Profile
export const getProfile = async (
  req: Request,
  res: Response<READ_PROFILE_RESPONSE>
) => {
  try {
    const existingProfiles = await db.select().from(profile);
    const existingProfile = existingProfiles[0];
    
    if (!existingProfile) {
      return res.status(200).json({ message: "No profile found", result: null });
    }

    return res.status(200).json({ message: "Profile fetched successfully", result: existingProfile as any });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", result: null });
  }
};

// 🔄 UPDATE PROFILE
export const updateProfile = async (
  req: Request<{}, {}, UPDATE_PROFILE_REQUEST>,
  res: Response<UPDATE_PROFILE_RESPONSE>
) => {
  try {
    const existingProfiles = await db.select().from(profile);
    if (existingProfiles.length === 0) {
      cleanLocalFiles(req.files);
      return res.status(404).json({ message: "Profile not found to update" });
    }

    const currentProfile = existingProfiles[0]!;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let profileImageUrl = currentProfile.profileImage;
    let cvUrl = currentProfile.cv;

    // Handle profile image update
    if (files?.profilePic?.[0]) {
      // Extract public id and delete old image
      try {
        const urlParts = currentProfile.profileImage.split('/');
        const filePart = urlParts[urlParts.length - 1];
        if (filePart) {
          const publicId = `profile/${filePart.split('.')[0]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (e) {
        console.error("Failed to delete old image", e);
      }

      const uploadRes = await cloudinary.uploader.upload(files.profilePic[0]!.path, { folder: "profile" });
      profileImageUrl = uploadRes.secure_url;
    }

    // Handle CV update
    if (files?.cv?.[0]) {
      try {
        const urlParts = currentProfile.cv.split('/');
        const filePart = urlParts[urlParts.length - 1];
        if (filePart) {
          // For raw files, Cloudinary public_id usually includes the extension, e.g. resume/my-cv.pdf
          const publicId = `resume/${filePart}`; 
          await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        }
      } catch (e) {
        console.error("Failed to delete old cv", e);
      }

      const uploadRes = await cloudinary.uploader.upload(files.cv[0]!.path, { folder: "resume", resource_type: "raw" });
      cvUrl = uploadRes.secure_url;
    }

    cleanLocalFiles(req.files);

        const {
      name, title, bio, journey, work, dob, location, email, mobile, language,
      yearExp, projectsCompleted, technologies, happyClients, githubURL, linkedin
    } = req.body;

    const updateData: Partial<typeof profile.$inferInsert> = {
      profileImage: profileImageUrl,
      cv: cvUrl,
      updatedAt: new Date()
    };

    if (name !== undefined) updateData.name = String(name);
    if (title !== undefined) updateData.title = String(title);
    if (bio !== undefined) updateData.bio = String(bio);
    if (journey !== undefined) updateData.journey = String(journey);
    if (work !== undefined) updateData.work = String(work);
    if (dob !== undefined) updateData.dob = String(dob);
    if (location !== undefined) updateData.location = String(location);
    if (email !== undefined) updateData.email = String(email);
    if (mobile !== undefined) updateData.mobile = String(mobile);
    if (language !== undefined) updateData.language = String(language);
    if (yearExp !== undefined) updateData.yearExp = Number(yearExp);
    if (projectsCompleted !== undefined) updateData.projectsCompleted = Number(projectsCompleted);
    if (technologies !== undefined) updateData.technologies = Number(technologies);
    if (happyClients !== undefined) updateData.happyClients = Number(happyClients);
    if (githubURL !== undefined) updateData.githubURL = String(githubURL);
    if (linkedin !== undefined) updateData.linkedin = String(linkedin);

    await db.update(profile)
      .set(updateData)
      .where(eq(profile.id, currentProfile.id));

    return res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    cleanLocalFiles(req.files);
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ======================================================= Project =======================================================

// 🚀 ADD PROJECT
export const createProject = async (
  req: Request<{}, {}, CREATE_PROJECT_REQUEST>,
  res: Response<COMMON_RESPONSE | { project: Project }>
): Promise<void> => {

  try {

    // 📁 Check image exists
    if (!req.file) {

      res.status(400).json({
        message: "Project image is required",
      });

      return;
    }

    // ☁️ Upload image to Cloudinary
    const { secure_url } =
      await cloudinary.uploader.upload(
        req.file.path
      );

    // 📦 Extract frontend data
    const {
      title,
      desc,
      category,
      tech,
      liveURL,
      githubURL,
    } = req.body;

    // 💾 Save in PostgreSQL
    const project = await db
      .insert(projects)
      .values({
        title,
        desc,
        category,
        tech,
        liveURL,
        githubURL,
        hero: secure_url,
      })
      .returning();

    // ✅ Success response
    res.status(201).json({
      message: "Project created successfully 🚀",
      project: project[0],
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// 📖 READ ALL PROJECTS
export const readProjects = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const result = await db
      .select()
      .from(projects);

    res.status(200).json({
      result,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ✏️ UPDATE PROJECT
export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const {
      title,
      desc,
      category,
      tech,
      liveURL,
      githubURL,
    } = req.body;

    const updateData: any = {
      title,
      desc,
      category,
      tech,
      liveURL,
      githubURL,
    };

    // ✅ Optional image update
    if (req.file) {

      const { secure_url } =
        await cloudinary.uploader.upload(
          req.file.path
        );

      updateData.hero = secure_url;
    }

    // ✅ Update DB
    const updatedProject = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();

    res.status(200).json({
      message: "Project updated successfully ✨",
      project: updatedProject[0],
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// 🗑️ DELETE PROJECT
export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response<COMMON_RESPONSE>
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    // ❌ Delete Project
    await db
      .delete(projects)
      .where(eq(projects.id, id));

    res.status(200).json({
      message: "Project deleted successfully 🗑️",
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================================= skills =======================================================

// ➕ CREATE SKILL
export const createSkill = async (
  req: Request<{}, {}, CREATE_SKILL_REQUEST>,
  res: Response<CREATE_SKILL_RESPONSE>
): Promise<void> => {

  try {

    const { skill } = req.body;

    // ✅ Validation
    if (!skill) {

      res.status(400).json({
        message: "Skill is required",
      });

      return;
    }

    // 💾 Insert Skill
    const result = await db
      .insert(skills)
      .values({
        skill,
      })
      .returning();

    res.status(201).json({
      message: "Skill created successfully 🚀",
      result: result[0],
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// 👀 READ SKILLS
export const getSkills = async (
  req: Request,
  res: Response<READ_SKILL_RESPONSE>
): Promise<void> => {

  try {

    const result = await db
      .select()
      .from(skills);

    res.status(200).json({
      message: "Skills fetched successfully ✨",
      result,
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
      result: [],
    });
  }
};

// ✏️ UPDATE SKILL
export const updateSkill = async (
  req: Request<{ id: string }, {}, UPDATE_SKILL_REQUEST>,
  res: Response<CREATE_SKILL_RESPONSE>
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const { skill } = req.body;

    const result = await db
      .update(skills)
      .set({
        skill,
      })
      .where(eq(skills.id, id))
      .returning();

    res.status(200).json({
      message: "Skill updated successfully ✨",
      result: result[0],
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ❌ DELETE SKILL
export const deleteSkill = async (
  req: Request<{ id: string }>,
  res: Response<DELETE_SKILL_RESPONSE>
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    await db
      .delete(skills)
      .where(eq(skills.id, id));

    res.status(200).json({
      message: "Skill deleted successfully 🗑️",
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================= Experience =======================================================

// ➕ CREATE EXPERIENCE
export const createExperience = async (
  req: Request<{}, {}, CREATE_EXPERIENCE_REQUEST>,
  res: Response
) => {
  try {
    const { companyName, role, desc, workingDate } = req.body

    const result = await db
      .insert(experience)
      .values({
        companyName,
        role,
        desc,
        workingDate,
      })
      .returning()

    return res.status(201).json({
      message: "Experience created successfully",
      result: result[0],
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error creating experience",
    })
  }
}

// 👀 GET ALL EXPERIENCE
export const getAllExperience = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(experience)

    return res.status(200).json({
      message: "Experience fetched successfully",
      result,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching experience",
    })
  }
}

// ✏️ UPDATE EXPERIENCE
export const updateExperience = async (
  req: Request<{}, {}, UPDATE_EXPERIENCE_REQUEST>,
  res: Response
) => {
  try {
    const { id, companyName, role, desc, workingDate } = req.body

    const result = await db
      .update(experience)
      .set({
        companyName,
        role,
        desc,
        workingDate,
        updatedAt: new Date(),
      })
      .where(eq(experience.id, id))   // ✅ FIXED
      .returning()

    return res.status(200).json({
      message: "Experience updated successfully",
      result: result[0],
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error updating experience",
    })
  }
}

// ❌ DELETE EXPERIENCE
export const deleteExperience = async (
  req: Request<{}, {}, DELETE_EXPERIENCE_REQUEST>,
  res: Response
) => {
  try {
    const { id } = req.body

    await db
      .delete(experience)
      .where(eq(experience.id, id))   // ✅ FIXED

    return res.status(200).json({
      message: "Experience deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting experience",
    })
  }
}

// ======================================================= Contact =======================================================
// 💬 CREATE CONTACT
export const createContact = async (
  req: Request<{}, {}, CREATE_CONTACT_REQUEST>,
  res: Response
) => {
  try {
    const { name, email, message } = req.body;

    // ❗ Validation (important)
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 💾 Save to DB
    const result = await db
      .insert(contact)
      .values({
        name,
        email,
        message,
      })
      .returning();

    // 📩 ADMIN EMAIL
    try {
      await sendEmail({
        email: process.env.EMAIL as string,
        subject: "New Contact Message",
        message: adminTemplate({ name, email, message }),
      });
    } catch (err) {
      console.log("Admin email failed:", err);
    }

    // 📩 USER EMAIL
    try {
      await sendEmail({
        email,
        subject: "Thanks for contacting",
        message: userTemplate({ name, message }),
      });
    } catch (err) {
      console.log("User email failed:", err);
    }

    // ✅ RESPONSE
    return res.status(201).json({
      message: "Contact Created Successfully 🎉",
      result: result[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to Create Contact",
    });
  }
};