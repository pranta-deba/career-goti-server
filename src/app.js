import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRoute } from "./utils/rootRoute";
import notFound from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErrorHandler";

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
