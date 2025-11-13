import status from "http-status";
import { getDB } from "../config/db.config.js";
import AppError from "../utils/AppError.js";
import { COLLECTION_NAME } from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";
import { ObjectId } from "mongodb";

export const createResource = async (req, res, next) => {
  try {
    const db = getDB();
    const adminId = req.user.userId;
    const adminEmail = req.user.email;

    const { title, platform, url, relatedSkills, cost, image } = req.body;

    if (!title || !platform || !url || !relatedSkills || !cost) {
      throw new AppError(
        status.BAD_REQUEST,
        "All fields (title, platform, url, relatedSkills, cost) are required."
      );
    }

    const newResource = {
      title,
      platform,
      url,
      relatedSkills,
      cost,
      image,
      createdBy: {
        adminId: new ObjectId(adminId),
        adminEmail,
      },
      createdAt: new Date(),
      isDeleted: false,
    };

    const result = await db
      .collection(COLLECTION_NAME.RESOURCE)
      .insertOne(newResource);
    newResource._id = result.insertedId;

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Learning resource created successfully!",
      data: newResource,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllResources = async (req, res, next) => {
  try {
    const db = getDB();
    const resources = await db
      .collection(COLLECTION_NAME.RESOURCE)
      .find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .toArray();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Learning resources fetched successfully!",
      data: resources,
      meta: { total: resources.length },
    });
  } catch (error) {
    next(error);
  }
};

export const removeResource = async (req, res, next) => {
  try {
    const db = getDB();
    const resourceId = req.params.id;
    const result = await db
      .collection(COLLECTION_NAME.RESOURCE)
      .updateOne(
        { _id: new ObjectId(resourceId) },
        { $set: { isDeleted: true } }
      );
    if (result.modifiedCount === 0) {
      throw new AppError(status.NOT_FOUND, "Resource not found.");
    }
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Learning resource removed successfully!",
    });
  } catch (error) {
    next(error);
  }
};
