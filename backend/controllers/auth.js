import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadFileToS3 } from "../lib/s3.js";
// Signup route
export const signup = async (req, res) => {
  const { name, email, mobile, password } = await req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ "email.address": email }, { "mobile.number": mobile }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 7);

    // Create a new user
    const newUser = new User({
      name,
      email: {
        address: email,
        verified: false,
      },
      mobile: {
        number: mobile,
        verified: false,
      },
      password: hashedPassword,
    });

    // Send verification email
    await newUser.save();

    // Convert Mongoose document to plain JavaScript object
    const userDetails = newUser.toObject();
    delete userDetails.password; // Remove the password field
    const token = jwt.sign(userDetails.email.address, "ilovecars");

    return res
      .json({ success: true, user: userDetails, token: token })
      .status(200);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Loop through the `errors` object
      for (const field in err.errors) {
        return res
          .status(500)
          .json({ error: err.errors[field].properties.message }); // The validation message
      }
    }
  }
};

// Login route
export const login = async (req, res) => {
  const { email, password } = await req.body;

  try {
    const user = await User.findOne({ "email.address": email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "ilovecars");

    // Convert Mongoose document to plain JavaScript object
    const userDetails = user.toObject();
    delete userDetails.password; // Remove the password field

    return res
      .json({ success: true, user: userDetails, token: token })
      .status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { userId, gender, education } = req.body; // Get the user ID from the request

    if (!req.file) {
      return res.status(400).json({ error: "Profile picture is required" });
    }
    const fileName = `${userId}-${Date.now()}.${
      req.file.mimetype.split("/")[1]
    }`;
    const fileUrl = await uploadFileToS3(
      req.file.buffer,
      fileName,
      req.file.mimetype
    );
    const profilePicUrl = fileUrl;

    // S3 Image URL
    // const profilePicUrl = req.file.location;

    // Update the user's profilePic field in the database
    const user = await User.findByIdAndUpdate(
      userId,
      {
        "avatar.url": profilePicUrl,
        gender: gender,
        education: education,
      },
      { new: true }
    );

    // Convert Mongoose document to plain JavaScript object
    const userDetails = user.toObject();
    delete userDetails.password;
    return res.status(200).json({ success: true, user: userDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to upload profile picture" });
  }
};
