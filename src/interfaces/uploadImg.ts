import type { UploadApiResponse } from "cloudinary";

export interface UploadResponse {
  message: string;
  data: UploadApiResponse;
}
