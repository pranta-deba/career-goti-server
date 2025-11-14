import express from "express";
import {
  getAllUser,
  login,
  loginWithJWT,
  register,
  updateUser,
} from "../controllers/authController.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/jwt", authGuard, loginWithJWT);
router.get("/users", getAllUser);
router.put("/users/:id", updateUser);

export default router;
