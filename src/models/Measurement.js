import mongoose from "mongoose";

const MeasurementSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    garmentType: {
      type: String,
      required: true
    },
    values: {
      type: Object,
      required: true
    },
    fitType: {
      type: String,
      enum: ["Slim", "Regular", "Loose"],
      default: "Regular"
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    note: String
  },
  { timestamps: true }
);

export default mongoose.model("Measurement", MeasurementSchema);
