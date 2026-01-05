import mongoose from "mongoose";

const MeasurementTemplateSchema = new mongoose.Schema(
  {
    garmentType: {
      type: String,
      required: true,
      unique: true
    },
    fields: {
      type: [String],
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "MeasurementTemplate",
  MeasurementTemplateSchema
);
