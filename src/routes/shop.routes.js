import express from "express";
import {
  createShop,
  getShops,
  getShopById
} from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/", createShop);      // Create shop
router.get("/", getShops);         // All shops
router.get("/:id", getShopById);   // Shop by id

export default router;
