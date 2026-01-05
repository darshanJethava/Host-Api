import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop"
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
      unique: true
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "PARTIAL", "UNPAID"],
      default: "UNPAID"
    },
    note: String
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
