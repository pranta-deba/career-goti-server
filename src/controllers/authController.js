import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.config.js";
import status from "http-status";
import AppError from "../utils/AppError.js";
import { JWT_SECRET } from "../config/env.config.js";
import sendResponse from "../utils/sendResponse.js";
import { COLLECTION_NAME } from "../utils/constants.js";
import { ObjectId } from "mongodb";

export const register = async (req, res, next) => {
  try {
    const db = getDB();
    const {
      name,
      email,
      password,
      phone,
      role,
      image,
      designation,
      educationLevel,
      department,
      experience,
      preferredCareerTrack,
    } = req.body;
    if (!email || !password || !role) {
      throw new AppError(
        status.BAD_REQUEST,
        "Email, password, and role are required."
      );
    }
    const existingUser = await db
      .collection(COLLECTION_NAME.USER)
      .findOne({ email });
    if (existingUser) {
      throw new AppError(
        status.BAD_REQUEST,
        "User already exists with this email."
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      image,
      isDeleted: false,
      createdAt: new Date(),
    };

    if (role === "organization") {
      newUser.designation = designation || "Not specified";
    }

    if (role === "user") {
      newUser.educationLevel = educationLevel || "Not specified";
      newUser.department = department || "Not specified";
      newUser.experience = experience || "Not specified";
      newUser.preferredCareerTrack = preferredCareerTrack || "Not specified";
    }

    const result = await db.collection(COLLECTION_NAME.USER).insertOne(newUser);
    newUser._id = result.insertedId;

    const token = jwt.sign(
      { user: result.insertedId, email, role: role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    delete newUser.password;

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User registered successfully!",
      data: { ...newUser, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        status.BAD_REQUEST,
        "Email and password are required."
      );
    }

    const user = await db.collection(COLLECTION_NAME.USER).findOne({ email });
    if (!user) {
      throw new AppError(status.NOT_FOUND, "User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(status.UNAUTHORIZED, "Invalid password.");
    }

    const token = jwt.sign(
      { user: user._id, email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login successful!",
      data: { ...user, password: undefined, token },
    });
  } catch (error) {
    next(error);
  }
};

export const loginWithJWT = async (req, res, next) => {
  try {
    const db = getDB();
    const { email } = req.user;
    const result = await db.collection(COLLECTION_NAME.USER).findOne({ email });
    if (!result) {
      throw new AppError(status.NOT_FOUND, "User not found.");
    }
    const token = jwt.sign(
      { user: result._id, email, role: result.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login successful!",
      data: { ...result, password: undefined, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const db = getDB();
    const users = await db
      .collection(COLLECTION_NAME.USER)
      .find({}, { projection: { password: 0 } })
      .toArray();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Users fetched successfully!",
      data: users,
      meta: { total: users.length },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    const data = req.body;
    console.log(data);
    const result = await db
      .collection(COLLECTION_NAME.USER)
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: data },
        { upsert: true }
      );
    if (result.modifiedCount === 0) {
      throw new AppError(status.NOT_FOUND, "User not found.");
    }
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};
