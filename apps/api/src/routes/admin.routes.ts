import { Router } from "express";

import { createProfile, getProfile, updateProfile } from "../controllers/rough.controller";
import { profileFieldsUpload } from "../utils/upload";

const router = Router();

router
    .post("/create-profile",profileFieldsUpload, createProfile)
    .get("/read-profile", getProfile)
    .put("/update-profile", profileFieldsUpload, updateProfile)

    // project 

export default router;
