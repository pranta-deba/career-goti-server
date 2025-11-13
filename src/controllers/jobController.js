import status from "http-status";
import { getDB } from "../config/db.config.js";
import AppError from "../utils/AppError.js";
import { COLLECTION_NAME } from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";

export const createJob = async (req, res, next) => {
  try {
    const db = getDB();
    const { title, location, requiredSkills, experienceLevel, jobType } =
      req.body;

    const organizationId = req.user.userId;
    const organizationEmail = req.user.email;

    if (
      !title ||
      !location ||
      !requiredSkills ||
      !experienceLevel ||
      !jobType
    ) {
      throw new AppError(
        status.BAD_REQUEST,
        "All fields (title, location, requiredSkills, experienceLevel, jobType) are required."
      );
    }

    const newJob = {
      title,
      organizationId,
      organizationEmail,
      location,
      requiredSkills,
      experienceLevel,
      jobType,
      createdAt: new Date(),
      isDeleted: false,
    };
    const result = await db.collection(COLLECTION_NAME.JOB).insertOne(newJob);
    newJob._id = result.insertedId;

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Job created successfully!",
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const db = getDB();
    const jobs = await db.collection(COLLECTION_NAME.JOB).find({}).toArray();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Jobs fetched successfully!",
      data: jobs,
      meta: { total: jobs.length },
    });
  } catch (error) {
    next(error);
  }
};

// export const getSingleJob = async (req, res, next) => {};

// export const updateJob = async (req, res, next) => {};

// export const deleteJob = async (req, res, next) => {};
