import { Router } from "express";
import { loginQueen, logoutQueen } from "../controllers/auth.controller";

const router = Router()

router 
    .post("/login", loginQueen)
    .post("/logout", logoutQueen)

    // ================= PROFILE =================

export default router