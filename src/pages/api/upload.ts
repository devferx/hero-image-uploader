import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import path from "path";
import DatauriParser from "datauri/parser";

import cloudinary from "../../utils/cloudinary";

const handler = nc({
  onError: (err, req, res: NextApiResponse) => {
    res.status(500).end("Something went wrong");
  },
  onNoMatch: (req, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
})
  .use(multer().any())
  .post(async (req: any, res) => {
    const image = req.files.filter(
      (file: any) => file.fieldname === "image"
    )[0];

    const parser = new DatauriParser();

    const createImage = async (img: any) => {
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
    };

    const createdImage = await createImage(image);
    res.json({
      message: "Image uploaded successfully",
      data: createdImage,
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
