import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRoute } from "./utils/rootRoute.js";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.get("/", (req, res) => res.send(rootRoute));

// 404 handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
