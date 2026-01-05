import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop"
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["GENTS", "LADIES"],
      required: true
    },
    address: {
      type: String
    },
    note: {
      type: String
    },
    isRegular: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
