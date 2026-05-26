import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
});

export default cloudinary;