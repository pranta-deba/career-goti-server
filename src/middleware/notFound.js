import status from "http-status";

const notFound = (req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    status: status.NOT_FOUND,
    message: "API Not found!",
    errorSource: [],
  });
};

export default notFound;
