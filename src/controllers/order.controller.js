import mongoose from "mongoose";
import Order from "../models/Order.js";
import User from "../models/User.js";

/* ===============================
   CREATE ORDER
   ADMIN + WORKER
================================ */
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      shopId: req.user.shopId
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL ORDERS (SHOP WISE)
   ADMIN
================================ */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shopId: req.user.shopId })
      .populate("customerId", "name phone")
      .populate("workerId", "name phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET SINGLE ORDER
================================ */
export const getOrderById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(req.params.id)
      .populate("customerId", "name phone")
      .populate("workerId", "name phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE ORDER
   ADMIN + WORKER
================================ */
export const updateOrder = async (req, res) => {
  try {
    // ❌ workerId & shopId cannot be updated here
    delete req.body.workerId;
    delete req.body.shopId;

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        shopId: req.user.shopId
      },
      req.body,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE ORDER
   ADMIN ONLY
================================ */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      shopId: req.user.shopId
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ASSIGN ORDER TO WORKER
   ADMIN ONLY
================================ */
export const assignOrderToWorker = async (req, res) => {
  try {
    const { workerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({ message: "Invalid worker ID" });
    }

    // Check worker
    const worker = await User.findOne({
      _id: workerId,
      role: "WORKER",
      shopId: req.user.shopId,
      isActive: true
    });

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found or inactive"
      });
    }

    // Check order
    const order = await Order.findOne({
      _id: req.params.id,
      shopId: req.user.shopId
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.workerId = workerId;
    order.status = "STITCHING";
    await order.save();

    res.json({
      success: true,
      message: "Order assigned to worker successfully",
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET MY ORDERS
   WORKER
================================ */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      workerId: req.user.id,
      shopId: req.user.shopId
    })
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
