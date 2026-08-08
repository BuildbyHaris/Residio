import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./src/config/env.js";

import reviewRoutes from "./src/modules/reviews/routes/review.routes.js";
import findRoutes from "./src/modules/findHostel/routes/find.routes.js";
import authRoutes from "./src/modules/auth/routes/auth.routes.js";
import profileRoutes from "./src/modules/profile/routes/profile.routes.js";
import hostelRoutes from "./src/modules/ownerDashboard/routes/hostel.routes.js";
import ownerVerificationRoutes from "./src/modules/ownerVerification/routes/ownerVerification.routes.js";
import adminRoutes from "./src/modules/admin/routes/admin.routes.js";

import conversationRoutes from "./src/modules/chat/routes/conversation.routes.js";
import chatRoutes from "./src/modules/chat/routes/message.routes.js";

import errorMiddleware from "./src/shared/middlewares/error.middleware.js";

import {
  initializeSocket,
} from "./src/modules/chat/socket/socket.server.js";


const app = express();


// ======================================================
// HTTP SERVER
// ======================================================

const httpServer = http.createServer(app);


// ======================================================
// MIDDLEWARE
// ======================================================

console.log("Express CORS Origin:", env.frontendUrl);

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hostel Management API is running...",
  });
});


// ======================================================
// ROUTES
// ======================================================

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/profile",
  profileRoutes
);

app.use(
  "/api/v1/owner-verification",
  ownerVerificationRoutes
);

app.use(
  "/api/v1/hostels",
  findRoutes
);

app.use(
  "/api/v1/owner/hostels",
  hostelRoutes
);

app.use(
  "/api/v1/admin",
  adminRoutes
);

app.use(
  "/api/v1/reviews",
  reviewRoutes
);



// ======================================================
// CHAT ROUTES
// ======================================================

app.use(
  "/api/v1/chat",
  conversationRoutes
);

app.use(
  "/api/v1/chat",
  chatRoutes
);


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  errorMiddleware
);


// ======================================================
// DATABASE + SOCKET + SERVER START
// ======================================================

mongoose
  .connect(env.mongoUri)
  .then(() => {

    console.log(
      "✅ MongoDB Connected Successfully"
    );


    // Initialize Socket.IO
    initializeSocket(
      httpServer
    );


    // Start HTTP + Socket.IO server
    httpServer.listen(
      env.port,
      () => {

        console.log(
          `🚀 Server is running on http://localhost:${env.port}`
        );

        console.log(
          "🔌 Socket.IO server is ready"
        );

      }
    );

  })
  .catch((err) => {

    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(
      err.message
    );

  });