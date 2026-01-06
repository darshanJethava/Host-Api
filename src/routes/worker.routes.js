import express from "express";
import {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  toggleWorkerStatus,
  deleteWorker
} from "../controllers/worker.controller.js";

import auth from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();



router.post("/", auth, allowRoles("ADMIN"), createWorker);
router.get("/", auth, allowRoles("ADMIN"), getWorkers);
router.get("/:id", auth, allowRoles("ADMIN"), getWorkerById);
router.put("/:id", auth, allowRoles("ADMIN"), updateWorker);
router.put("/:id/status", auth, allowRoles("ADMIN"), toggleWorkerStatus);
router.delete("/:id", auth, allowRoles("ADMIN"), deleteWorker);

export default router;
