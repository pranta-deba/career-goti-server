// utils/AppError.js
import status from "http-status";

class AppError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {Array<{path: string, message: string}>} [errorSource]
   */
  constructor(
    statusCode = status.INTERNAL_SERVER_ERROR,
    message = "Something went wrong",
    errorSource = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorSource = errorSource ? errorSource : [{ path: "", message }];
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
