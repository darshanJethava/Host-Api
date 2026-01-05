import express from "express";
import {
  createTemplate,
  getTemplates,
  addMeasurement,
  getCustomerMeasurements
} from "../controllers/measurement.controller.js";

import auth from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();


router.post(
  "/templates",
  auth,
  allowRoles("ADMIN"),
  createTemplate
);

router.get(
  "/templates",
  auth,
  allowRoles("ADMIN", "WORKER"),
  getTemplates
);


router.post(
  "/",
  auth,
  allowRoles("ADMIN", "WORKER"),
  addMeasurement
);

router.get(
  "/:customerId",
  auth,
  allowRoles("ADMIN", "WORKER"),
  getCustomerMeasurements
);

export default router;
