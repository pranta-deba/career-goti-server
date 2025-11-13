import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRoute } from "./utils/rootRoute.js";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send(rootRoute));

// 404 handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
