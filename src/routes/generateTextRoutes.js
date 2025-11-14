import express from "express";
import {
  chatBot,
  generateText,
} from "../controllers/generateTextController.js";

const router = express.Router();

router.post("/", generateText);
router.post("/bot", chatBot);

export default router;
