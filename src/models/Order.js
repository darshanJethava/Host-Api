import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop"
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer"
    },

    measurementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Measurement"
    },

    // 🔹 NEW FIELD (ASSIGN TO WORKER)
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    garmentType: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    advance: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["PENDING", "STITCHING", "COMPLETED", "DELIVERED"],
      default: "PENDING"
    },

    deliveryDate: {
      type: Date,
      required: true
    },

    note: String
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
