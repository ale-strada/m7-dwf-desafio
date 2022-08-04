import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ale-strada-apx",
  api_key: process.env.CLOUDINARY_AK,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export { cloudinary };
