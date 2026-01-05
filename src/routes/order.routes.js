import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/order.controller.js";
import {
  assignOrderToWorker,
  getMyOrders
} from "../controllers/order.controller.js";

import auth from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

/* =========================
   ORDER ROUTES
========================= */

/* CREATE ORDER
   ADMIN + WORKER */
router.post(
  "/",
  auth,
  allowRoles("ADMIN", "WORKER"),
  createOrder
);

/* GET ALL ORDERS
   ADMIN + WORKER */
router.get(
  "/",
  auth,
  allowRoles("ADMIN", "WORKER"),
  getOrders
);

/* GET SINGLE ORDER
   ADMIN + WORKER */
router.get(
  "/:id",
  auth,
  allowRoles("ADMIN", "WORKER"),
  getOrderById
);

/* UPDATE ORDER
   ADMIN + WORKER */
router.put(
  "/:id",
  auth,
  allowRoles("ADMIN", "WORKER"),
  updateOrder
);
router.put(
  "/:id/assign",
  auth,
  allowRoles("ADMIN"),
  assignOrderToWorker
);
router.get(
  "/my",
  auth,
  allowRoles("WORKER"),
  getMyOrders
);


/* DELETE ORDER
   ADMIN ONLY */
router.delete(
  "/:id",
  auth,
  allowRoles("ADMIN"),
  deleteOrder
);

export default router;
