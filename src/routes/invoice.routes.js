import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceByOrder,
  updatePayment
} from "../controllers/invoice.controller.js";

import auth from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

/* =========================
   INVOICE ROUTES
========================= */

/* CREATE INVOICE
   ADMIN ONLY */
router.post(
  "/",
  auth,
  allowRoles("ADMIN"),
  createInvoice
);

/* GET ALL INVOICES
   ADMIN ONLY */
router.get(
  "/",
  auth,
  allowRoles("ADMIN"),
  getInvoices
);

/* GET INVOICE BY ORDER
   ADMIN ONLY */
router.get(
  "/order/:orderId",
  auth,
  allowRoles("ADMIN"),
  getInvoiceByOrder
);

/* UPDATE PAYMENT
   ADMIN ONLY */
router.put(
  "/:id/payment",
  auth,
  allowRoles("ADMIN"),
  updatePayment
);

export default router;
