import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

/**
 * @type {Db}
 */

let db;

export const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    // await client.connect();
    db = client.db();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};

export const getDB = () => db;
