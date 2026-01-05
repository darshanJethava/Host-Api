import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";

/* ===============================
   HELPER: GENERATE INVOICE NO
================================ */
const generateInvoiceNumber = async (shopId) => {
  const count = await Invoice.countDocuments({ shopId });
  return `INV-${count + 1}`;
};

/* ===============================
   CREATE INVOICE
================================ */
export const createInvoice = async (req, res) => {
  try {
    const { orderId, totalAmount, paidAmount = 0, note } = req.body;

    // ensure order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // prevent duplicate invoice
    const exists = await Invoice.findOne({ orderId });
    if (exists) {
      return res.status(400).json({ message: "Invoice already exists for this order" });
    }

    const invoiceNumber = await generateInvoiceNumber(req.user.shopId);

    let paymentStatus = "UNPAID";
    if (paidAmount >= totalAmount) paymentStatus = "PAID";
    else if (paidAmount > 0) paymentStatus = "PARTIAL";

    const invoice = await Invoice.create({
      shopId: req.user.shopId,
      orderId,
      invoiceNumber,
      totalAmount,
      paidAmount,
      paymentStatus,
      note
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL INVOICES (SHOP WISE)
================================ */
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ shopId: req.user.shopId })
      .populate("orderId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET INVOICE BY ORDER ID
================================ */
export const getInvoiceByOrder = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ orderId: req.params.orderId });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE PAYMENT
================================ */
export const updatePayment = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.paidAmount = paidAmount;

    if (paidAmount >= invoice.totalAmount) invoice.paymentStatus = "PAID";
    else if (paidAmount > 0) invoice.paymentStatus = "PARTIAL";
    else invoice.paymentStatus = "UNPAID";

    await invoice.save();

    res.json({
      success: true,
      message: "Payment updated successfully",
      data: invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
