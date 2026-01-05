import express from "express";
import { register, createWorker, login } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

/* ADMIN REGISTER (ONE TIME) */
router.post("/register", register);

/* CREATE WORKER (ADMIN ONLY) */
router.post(
  "/worker",
  auth,
  allowRoles("ADMIN"),
  createWorker
);

/* LOGIN */
router.post("/login", login);

export default router;
