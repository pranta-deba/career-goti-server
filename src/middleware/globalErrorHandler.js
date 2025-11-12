import AppError from "../utils/AppError.js";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
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
