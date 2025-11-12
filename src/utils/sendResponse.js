const sendResponse = (
  res,
  { statusCode = 202, success = true, message, data, meta }
) => {
  res.status(statusCode).json({
    success,
    status: statusCode,
    message: message || "Retrieve Successful",
    meta: meta || null,
    data,
  });
};

export default sendResponse;
