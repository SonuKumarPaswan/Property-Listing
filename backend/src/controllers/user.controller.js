const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Generate Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

//  GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log("Fetched users:", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Required fields validation
    if (!username || !username.trim()) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Role validation: ONLY 'user' and 'owner' allowed for public registration
    if (role === "agent") {
      return res.status(403).json({
        message: "Agent accounts must be assigned through an admin approval process, not public registration.",
      });
    }

    if (role && !["user", "owner"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Only 'user' (Buyer/Tenant) and 'owner' (Property Owner) are allowed for registration.",
      });
    }

    const assignedRole = role || "user";
    const normalizedEmail = email.toLowerCase().trim();
    const cleanUsername = username.trim();

    // Check duplicate email
    const emailExists = await User.findOne({ email: normalizedEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check duplicate username
    const usernameExists = await User.findOne({ username: cleanUsername });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const user = await User.create({
      username: cleanUsername,
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE PROFILE
const deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
