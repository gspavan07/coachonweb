import { uploadFileToS3, deleteFileFromS3 } from "../lib/s3.js";
import User from "../models/userModel.js";

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, education, oldProfilePicURL } = req.body;
    let updateFields = {};

    // Add only changed fields to updateFields
    if (name) updateFields.name = name;
    if (gender) updateFields.gender = gender;
    if (education) updateFields.education = education;

    // Handle image upload if a new file is provided
    if (req.file) {
      await deleteFileFromS3(oldProfilePicURL);
      const fileName = `${id}-${Date.now()}.${req.file.mimetype.split("/")[1]}`;
      const fileUrl = await uploadFileToS3(
        req.file.buffer,
        fileName,
        req.file.mimetype
      );
      updateFields.avatar = { url: fileUrl };
    }

    console.log(updateFields);
    // Update the user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
