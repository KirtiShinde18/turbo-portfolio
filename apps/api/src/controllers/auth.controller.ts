import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE } from "@repo/types";
import { Request, Response } from "express";
import db from "../config/db";
import { user } from "../models";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { COOKIE_NAME, JWT_KEY, NODE_ENV, PRODUCTION } from "../config/env";

//=================================== SIGNIN ===================================

// 💖 Queen login endpoint — welcome to the system queen 👑
export const loginQueen = async (req: Request<{}, {}, LOGIN_REQUEST> , res: Response<LOGIN_RESPONSE>) => {
  try {
    // frontend 👇🏻
    const {email, password} = req.body

    // Check if user exists in database using email
    const [result] = await db.select().from(user).where(eq(user.email, email))
    console.log(result);
    
    // If user not found, return error message
    if(!result){
      return res.status(401).json({message: "Invalid credentials"})
    }
    
    // Compare entered password with hashed password in DB
    const verify = await bcryptjs.compare(password, result.password)
    
    // If password doesn't match, return error
    if(!verify){
      return res.status(401).json({message: "Invalid credentials"})

    }

    // Send token in HTTP-only cookie
    const token = jwt.sign({ id: result.id }, JWT_KEY, {expiresIn: "1d"})
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true, // Prevent access from js (🔐 security)
      maxAge: 1000 * 60 * 60 * 24, // 24 hour
      secure: NODE_ENV === PRODUCTION
    })

    res.status(200).json({
      message: "Welcome Queen 🔥, you’re in 🎀",
      result: {
        id: result.id,
        email: result.email,
        mobile: result.mobile,
        name: result.name,
        role: result.role,

      } 
    })
  } catch (error) {
    console.log(error);  // uh-oh bug spotted 🐞
    res.status(500).json({message: "Oops… unable to sign in 💔"})
    
  }
}

//=================================== SIGNOUT ===================================

// signout handler — saying bye to the Queen 👋🏻 💖
export const logoutQueen = async (req: Request<{}, {}, LOGOUT_REQUEST> , res: Response<LOGOUT_RESPONSE>) => {
  try {
    res.clearCookie(COOKIE_NAME)
    res.status(200).json({message: "Logged out successfully, see you soon 💖👋🏻" }) // bye bye session ✨
  } catch (error) {
    console.log(error); // uh-oh bug spotted 🐞
    res.status(500).json({message: "Oops… logout failed 💔 please try again"})
    
  }
}
