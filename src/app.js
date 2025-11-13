import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRoute } from "./utils/rootRoute.js";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import resourceRoute from "./routes/resourceRoute.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/resource", resourceRoute);
app.get("/", (req, res) => res.send(rootRoute));

// 404 handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
