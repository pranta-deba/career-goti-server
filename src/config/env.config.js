import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_NAME = process.env.ADMIN_NAME;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const ADMIN_PHONE = process.env.ADMIN_PHONE;
