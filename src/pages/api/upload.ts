import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";

import { createImage } from "../../utils/createImage";
import type { MulterFile } from "../../interfaces/multerFile";

const handler = nc({
  onError: (err, req, res: NextApiResponse) => {
    res.status(500).end("Something went wrong");
  },
  onNoMatch: (req, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
})
  .use(multer().any())
  .post(async (req: NextApiRequest & { files: MulterFile[] }, res) => {
    const image = req.files.filter(
      (file: any) => file.fieldname === "image"
    )[0];

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
