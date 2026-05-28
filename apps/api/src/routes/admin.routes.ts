import { Router } from "express";

import { createProfile, getProfile, updateProfile } from "../controllers/rough.controller";
import { profileFieldsUpload, projectUpload } from "../utils/upload";
import { createContact, createExperience, createProject, createSkill, deleteExperience, deleteProject, deleteSkill, getAllExperience, getSkills, readProjects, updateExperience, updateProject, updateSkill } from "../controllers/admin.controller";

const router = Router();

router
    .post("/create-profile",profileFieldsUpload, createProfile)
    .get("/read-profile", getProfile)
    .put("/update-profile", profileFieldsUpload, updateProfile)

    // project 
    .post( "/create-project", projectUpload, createProject )
    .get( "/read-project", readProjects )
    .put( "/update-project/:id", projectUpload, updateProject )
    .delete( "/delete-project/:id", deleteProject)

    // skills
    .post("/create-skill", createSkill)
    .get("/read-skill", getSkills)
    .put("/update-skill/:id", updateSkill)
    .delete("/delete-skill/:id", deleteSkill)

    // experience 
    .post("/experience", createExperience)
    .get("/experience", getAllExperience)
    .put("/experience", updateExperience)
    .delete("/experience", deleteExperience)

    // contact 
    .post("/create-contact", createContact)

export default router;
