import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import status from "http-status";
import AppError from "../utils/AppError.js";

dotenv.config();

export const authGuard = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(status.UNAUTHORIZED, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "Token missing or malformed");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(new AppError(status.UNAUTHORIZED, "Token has expired"));
    } else if (err.name === "JsonWebTokenError") {
      next(new AppError(status.UNAUTHORIZED, "Invalid token"));
    } else {
      next(err);
    }
  }
};
