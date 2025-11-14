import express from "express";
import { generateText } from "../controllers/generateTextController.js";


const router = express.Router();

router.post("/", generateText);

export default router;
