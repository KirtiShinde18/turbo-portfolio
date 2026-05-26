
import { eq } from "drizzle-orm";
import db from "./config/db";
import { user } from "./models";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()

  const QUEEN_NAME = process.env.QUEEN_NAME as string
  const QUEEN_EMAIL = process.env.QUEEN_EMAIL as string
  const QUEEN_PASSWORD = process.env.QUEEN_PASSWORD as string
  const QUEEN_MOBILE = process.env.QUEEN_MOBILE as string
  const QUEEN_ROLE = process.env.QUEEN_ROLE as string

export const seedQueen = async () => {
    try {

        // Check Already exists
        const [result] = await db.select().from(user).where(eq(user.email, QUEEN_EMAIL))
        
        if(result){
            console.log("⚠️ Queen Already Exist 🚫 👑 ");
            process.exit()
            
        }
        
        // 🔐 Hash password
        const hashedPassword = await bcryptjs.hash(QUEEN_PASSWORD, 10);
        
        // 👑 Insert Queen into DB
        await db.insert(user).values({
          name: QUEEN_NAME ,
          email : QUEEN_EMAIL,
          mobile: QUEEN_MOBILE, 
          password: hashedPassword,
          role: QUEEN_ROLE
        });
        
        console.log("Queen seeded successfully 👑 ✨");
        process.exit()
    } catch (error) {
        // uh-oh bug spotted 🐞
        console.log(error);
        process.exit()
    }
};

seedQueen();