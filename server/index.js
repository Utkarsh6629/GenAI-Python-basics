import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lessonsRouter from "./routes/lessons.js";
import executeRouter from "./routes/execute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/lessons", lessonsRouter);
app.use("/api/execute", executeRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "Python & Gen AI Bootcamp API",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
