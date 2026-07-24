import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../src/modules/auth/models/User.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);

  const password = await bcrypt.hash("Haris@123", 10);

  const admin = await User.create({
    name: "Super Admin",
    email: "hariisyaseen07@gmail.com",
    phone: "03001234569",
    password,
    role: "admin",
    isVerified: true
  });

  console.log("Admin Created:", admin.email);

  await mongoose.disconnect();
  process.exit(0);

} catch (error) {
  console.error("Admin Creation Failed:", error.message);
  process.exit(1);
}