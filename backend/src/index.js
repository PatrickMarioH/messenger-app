// Dependencies

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import From Other Files

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

import messageRoutes from "./routes/message.route.js";

// Initialization

dotenv.config();

const app = express();

// Main

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(cors({

    origin: "http://localhost:5173",

    credentials: true,

}));

app.use("/api/auth", authRoutes);

app.use("/api/message", messageRoutes);

app.listen(PORT, () => {

    console.log("Server Is Running On Port: " + PORT);

    connectDB();

});