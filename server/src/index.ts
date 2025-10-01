import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { api } from "./routes";

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", api);

async function start() {
  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
  if (!process.env.SKIP_DB && mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed. API is running without DB:", error);
    }
  } else {
    console.log("Starting API without MongoDB connection");
  }
}

start();


