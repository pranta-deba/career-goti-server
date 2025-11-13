import status from "http-status";
import AppError from "../utils/AppError.js";
import { ROLE } from "../utils/constants.js";

export const adminGuard = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(status.UNAUTHORIZED, "User not authenticated");
    }

    if (req.user.role !== ROLE.ADMIN) {
      throw new AppError(
        status.FORBIDDEN,
        "Access denied. Only admin are allowed."
      );
    }
    console.log("Admin Guard: ", req.user);

    next();
  } catch (err) {
    next(err);
  }
};
