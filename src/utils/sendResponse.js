import status from "http-status";

/**
 * @param {import("express").Response} res
 * @param {{
 *  statusCode?: number;
 *  success?: boolean;
 *  message?: string;
 *  data?: any;
 *  meta?: any;
 * }} options
 */
const sendResponse = (
  res,
  { statusCode = status.OK, success = true, message, data, meta }
) => {
  res.status(Number(statusCode)).json({
    success,
    status: Number(statusCode),
    message: message || "Retrieve Successful",
    meta: meta || null,
    data,
  });
};

export default sendResponse;
