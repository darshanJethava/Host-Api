
import Shop from "../models/Shop.js";

/* =========================
   CREATE SHOP
========================= */
export const createShop = async (req, res) => {
  try {
    const { name, ownerName, phone, address } = req.body;

    if (!name || !ownerName || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await Shop.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    const shop = await Shop.create({
      name,
      ownerName,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL SHOPS
========================= */
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET SHOP BY ID
========================= */
export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.json({ success: true, data: shop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
