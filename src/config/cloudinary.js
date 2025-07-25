import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_URL) {
  throw new Error("CLOUDINARY_URL não encontrada no arquivo .env");
}

cloudinary.config({
  secure: true,
});

export default cloudinary;
