import express from "express";
import { createUser, login, signup } from "../controllers/auth.js";
import multer from "multer";
import path from "path";
import multerS3 from "multer-s3";
import s3 from "../lib/s3.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure Multer to Use S3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // Allows public access
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `profile_pics/${Date.now()}_${file.originalname}`);
    },
  }),
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/createuser", upload.single("profilePic"), createUser);

export default router;
