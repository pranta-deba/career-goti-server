import express from "express";
import {
  chatBot,
  generateText,
  roadMapGenerator,
} from "../controllers/generateTextController.js";

const router = express.Router();

router.post("/", generateText);
router.post("/bot", chatBot);
router.post("/roadmap", roadMapGenerator);

export default router;
