import { Request, Response } from "express";
import db from "../config/db";
import { profile } from "../models";
import cloudinary from "../utils/cloud";
import { eq } from "drizzle-orm";
import { 
  CREATE_PROFILE_REQUEST, 
  CREATE_PROFILE_RESPONSE, 
  READ_PROFILE_RESPONSE, 
  UPDATE_PROFILE_REQUEST, 
  UPDATE_PROFILE_RESPONSE 
} from "@repo/types";
import fs from "fs";

// Helper to delete local files after upload
const cleanLocalFiles = (files: any) => {
  if (files?.profilePic?.[0]?.path) fs.unlinkSync(files.profilePic[0].path);
  if (files?.cv?.[0]?.path) fs.unlinkSync(files.cv[0].path);
};

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