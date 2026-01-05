import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "WORKER"],
      default: "ADMIN"
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop"
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
