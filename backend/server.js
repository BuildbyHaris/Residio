import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./src/config/env.js";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";
import profileRoutes from "./src/modules/profile/routes/profile.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hostel Management API is running...",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

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