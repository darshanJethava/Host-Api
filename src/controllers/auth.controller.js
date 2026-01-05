import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   REGISTER ADMIN (ONE TIME)
========================= */
export const register = async (req, res) => {
  try {
    const { name, phone, email, password, role, shopId } = req.body;

    if (!name || !phone || !password || !shopId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || "ADMIN",
      shopId
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        shopId: user.shopId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   CREATE WORKER (ADMIN ONLY)
========================= */
export const createWorker = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        message: "Name, phone and password are required"
      });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this phone number"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: "WORKER",
      shopId: req.user.shopId
    });

    res.status(201).json({
      success: true,
      message: "Worker created successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   LOGIN (ADMIN / WORKER)
========================= */
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isActive)
      return res.status(403).json({ message: "User is deactivated" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, shopId: user.shopId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        shopId: user.shopId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
