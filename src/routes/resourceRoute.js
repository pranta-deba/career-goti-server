import express from "express";
import {
  createResource,
  getAllResources,
  relevantResource,
  removeResource,
} from "../controllers/resourceController.js";
import { authGuard } from "../middleware/authGuard.js";
import { adminGuard } from "../middleware/adminGuard.js";

const router = express.Router();

router.post("/", authGuard, adminGuard, createResource);
router.get("/", getAllResources);
router.delete("/:id", authGuard, adminGuard, removeResource);
router.post("/relevant", relevantResource);

export default router;
