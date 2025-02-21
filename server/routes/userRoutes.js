const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// ✅ User Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password); // Debugging output

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user); // Debugging output

        if (!user) {
            console.log("Invalid credentials: User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (password !== user.password) {
            console.log("Invalid credentials: Password incorrect");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("Login successful!");
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id, name: user.name });

    } catch (error) {
        console.error("Login error:", error); // Debugging output
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports = router;
