import express from "express";
import {
  login,
  loginWithJWT,
  register,
} from "../controllers/authController.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/jwt", authGuard, loginWithJWT);

export default router;
