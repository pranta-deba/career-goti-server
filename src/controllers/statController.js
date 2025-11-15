import status from "http-status";
import { getDB } from "../config/db.config.js";
import { COLLECTION_NAME } from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";

export const getStats = async (req, res, next) => {
  try {
    const db = getDB();
    const users = await db.collection(COLLECTION_NAME.USER).countDocuments();
    const jobs = await db.collection(COLLECTION_NAME.JOB).countDocuments();
    const resource = await db
      .collection(COLLECTION_NAME.RESOURCE)
      .countDocuments();
    const organizationConnect = await db
      .collection(COLLECTION_NAME.USER)
      .find({ isDeleted: false, role: "organization" })
      .toArray();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Stats fetched successfully!",
      data: {
        users,
        jobs,
        resource,
        organizationConnect: organizationConnect.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
