import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* ===============================
   CREATE WORKER (ADMIN)
================================ */
export const createWorker = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, phone and password are required" });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Worker already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await User.create({
      name,
      phone,
      password: hashedPassword,
      role: "WORKER",
      shopId: req.user.shopId
    });

    res.status(201).json({
      success: true,
      message: "Worker created successfully",
      data: {
        _id: worker._id,
        name: worker.name,
        phone: worker.phone,
        role: worker.role,
        isActive: worker.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL WORKERS (SHOP WISE)
================================ */
export const getWorkers = async (req, res) => {
  try {
    const workers = await User.find({
      shopId: req.user.shopId,
      role: "WORKER"
    }).select("-password");

    res.json({
      success: true,
      data: workers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET SINGLE WORKER
================================ */
export const getWorkerById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid worker ID" });
    }

    const worker = await User.findOne({
      _id: req.params.id,
      role: "WORKER",
      shopId: req.user.shopId
    }).select("-password");

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      success: true,
      data: worker
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE WORKER
================================ */
export const updateWorker = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ❌ Prevent role & shopId change
    delete updateData.role;
    delete updateData.shopId;

    // 🔐 Hash password if updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const worker = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "WORKER",
        shopId: req.user.shopId
      },
      updateData,
      { new: true }
    ).select("-password");

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      success: true,
      message: "Worker updated successfully",
      data: worker
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ACTIVATE / DEACTIVATE WORKER
================================ */
export const toggleWorkerStatus = async (req, res) => {
  try {
    const worker = await User.findOne({
      _id: req.params.id,
      role: "WORKER",
      shopId: req.user.shopId
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    worker.isActive = !worker.isActive;
    await worker.save();

    res.json({
      success: true,
      message: `Worker ${worker.isActive ? "activated" : "deactivated"}`,
      data: {
        _id: worker._id,
        isActive: worker.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE WORKER (ADMIN ONLY)
================================ */
export const deleteWorker = async (req, res) => {
  try {
    const worker = await User.findOneAndDelete({
      _id: req.params.id,
      role: "WORKER",
      shopId: req.user.shopId
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      success: true,
      message: "Worker deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
