import Measurement from "../models/Measurement.js";
import MeasurementTemplate from "../models/MeasurementTemplate.js";

/* ===============================
   CREATE TEMPLATE (ADMIN)
================================ */
export const createTemplate = async (req, res) => {
  try {
    const template = await MeasurementTemplate.create(req.body);
    res.status(201).json({
      success: true,
      data: template
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL TEMPLATES
================================ */
export const getTemplates = async (req, res) => {
  try {
    const templates = await MeasurementTemplate.find({ isActive: true });
    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADD MEASUREMENT
================================ */
export const addMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.create({
      ...req.body,
      workerId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Measurement saved successfully",
      data: measurement
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET CUSTOMER MEASUREMENTS
================================ */
export const getCustomerMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find({
      customerId: req.params.customerId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: measurements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
