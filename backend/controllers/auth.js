import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    return res.json({ success: true }).status(200);
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

    return res.json({ success: true, data: user, token: token }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
