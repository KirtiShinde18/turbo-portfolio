import multer, { diskStorage } from "multer";

export const profileFieldsUpload = multer({ storage: diskStorage({}) }).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "cv", maxCount: 1 }
]);


// 🚀 Project Upload Middleware
export const projectUpload = multer({
  storage: diskStorage({})
}).single("hero");