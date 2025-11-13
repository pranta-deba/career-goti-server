import express from "express";
import { createResource, getAllResources } from "../controllers/resourceController.js";
import { authGuard } from "../middleware/authGuard.js";
import { adminGuard } from "../middleware/adminGuard.js";

const router = express.Router();

router.post("/", authGuard, adminGuard, createResource);
router.get("/", getAllResources);

export default router;
