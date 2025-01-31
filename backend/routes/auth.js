import express from "express";
import { createUser, login, signup } from "../controllers/auth.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/signup", signup);
router.post("/login", login);
router.post("/createuser", upload.single("profilePic"), createUser);

export default router;
