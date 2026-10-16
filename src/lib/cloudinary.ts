import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dh2fkwqcl",
  api_key: process.env.CLOUDINARY_API_KEY || "373116472417379",
  api_secret: process.env.CLOUDINARY_API_SECRET || "R6vpeeitNQHs7oUVc2bHMlfipuY",
  secure: true,
});

export async function uploadImageBufferToCloudinary(
  buffer: Buffer,
  folder = process.env.CLOUDINARY_FOLDER || "womenday"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto" },
          { max_width: 1600, max_height: 1600, crop: "limit" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

export default cloudinary;
