import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { env } from "./src/config/env.js";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hostel Management API is running...",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(env.mongoUri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
  });