import DatauriParser from "datauri/parser";
import path from "path";
import { MulterFile } from "../interfaces/multerFile";

import cloudinary from "./cloudinary";

const parser = new DatauriParser();

export async function createImage(img: MulterFile) {
  const base64Image = parser.format(
    path.extname(img.originalname).toString(),
    img.buffer
  );
  const uploadedImageResponse = await cloudinary.uploader.upload(
    base64Image.content!,
    {
      resource_type: "image",
      folder: "hero-img",
      upload_preset: "hero-img-upload",
    }
  );

  return uploadedImageResponse;
}
