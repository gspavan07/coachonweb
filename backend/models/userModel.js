import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z\s]+$/, "Name can only contain alphabets and spaces"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Restrict to these two options
  },
  avatar: {
    url: {
      type: String,
      default: "", // Default can be an empty string or a placeholder image URL
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/,
        "Please enter a valid image URL.",
      ], // Regex to validate URL for images
    },
    uploadedAt: {
      type: Date,
      default: Date.now, // Automatically set the date of upload
    },
  },
  education: {
    type: String,
    enum: [
      "9th",
      "10th",
      "12th",
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year",
    ], // Valid education levels
  },
  email: {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address.",
      ], // Regex for email address.
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  mobile: {
    number: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/,
        "Please enter a valid Indian mobile number.",
      ], // Regex for Indian mobile numbers
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const User = mongoose.model("UserModel", userSchema, "users");

export default User;
