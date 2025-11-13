import status from "http-status";
import AppError from "../utils/AppError.js";
import { ROLE } from "../utils/constants.js";

export const organizationGuard = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(status.UNAUTHORIZED, "User not authenticated");
    }

    if (req.user.role !== ROLE.ORGANIZATION) {
      throw new AppError(
        status.FORBIDDEN,
        "Access denied. Only organizations are allowed."
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
