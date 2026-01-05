import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customer.controller.js";

import auth from "../middleware/auth.middleware.js";

const router = express.Router();

/* CRUD ROUTES */
router.post("/", auth, createCustomer);          // CREATE
router.get("/", auth, getCustomers);              // READ ALL
router.get("/:id", auth, getCustomerById);        // READ ONE
router.put("/:id", auth, updateCustomer);         // UPDATE
router.delete("/:id", auth, deleteCustomer);      // DELETE

export default router;
