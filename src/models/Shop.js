import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Shop", ShopSchema);
