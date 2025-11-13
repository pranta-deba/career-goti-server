import AppError from "../utils/AppError.js";
import status from "http-status";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let errorSource = err.errorSource || [{ path: "", message }];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [{ path: "", message: err.message }];
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    errorSource,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
