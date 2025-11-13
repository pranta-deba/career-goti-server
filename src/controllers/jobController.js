import status from "http-status";
import { getDB } from "../config/db.config.js";
import AppError from "../utils/AppError.js";
import { COLLECTION_NAME } from "../utils/constants.js";
import sendResponse from "../utils/sendResponse.js";
import { ObjectId } from "mongodb";

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
      organizationId: new ObjectId(organizationId),
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
    const {
      title = "",
      location = "",
      jobType = "",
      page = 1,
      limit = 8,
    } = req.query;
    const query = {
      isDeleted: false,
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(location && { location: { $regex: location, $options: "i" } }),
      ...(jobType && { jobType: { $regex: jobType, $options: "i" } }),
    };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const jobs = await db
      .collection(COLLECTION_NAME.JOB)
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await db
      .collection(COLLECTION_NAME.JOB)
      .countDocuments(query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Jobs fetched successfully!",
      data: jobs,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleJob = async (req, res, next) => {
  try {
    const db = getDB();
    const jobId = req.params.id;

    const job = await db
      .collection(COLLECTION_NAME.JOB)
      .findOne({ _id: new ObjectId(jobId) });

    if (!job) {
      throw new AppError(status.NOT_FOUND, "Job not found!");
    }
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Job fetched successfully!",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateJob = async (req, res, next) => {};
// export const deleteJob = async (req, res, next) => {};
