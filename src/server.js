import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import seedAdmin from "./config/admin.config.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  seedAdmin();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};


startServer();
