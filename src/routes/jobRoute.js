import express from "express";
import {
  createJob,
  getAllJobs,
  getSingleJob,
} from "../controllers/jobController.js";
import { authGuard } from "../middleware/authGuard.js";
import { organizationGuard } from "../middleware/organizationGuard.js";

const router = express.Router();

router.post("/", authGuard, organizationGuard, createJob);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

// router.put("/:id", updateJob);
// router.delete("/:id", deleteJob);

export default router;
