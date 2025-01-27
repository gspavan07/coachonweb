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
    default: "",
    enum: ["Male", "Female"], // Restrict to these two options
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
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const User = mongoose.model("UserModel", userSchema, "users");

export default User;
