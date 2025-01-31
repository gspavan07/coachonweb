import express from "express";
import { updateProfile } from "../controllers/profile.js";
import multer from "multer";

const router = express.Router();

// Configure Multer to Use S3
const upload = multer({ storage: multer.memoryStorage() });

router.put("/updateprofile/:id", upload.single("profilePic"), updateProfile);

export default router;
