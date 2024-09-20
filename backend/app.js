import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectPrisma } from "./config/prisma.js";
dotenv.config();

import formRoute from "./routes/formRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect prisma
connectPrisma();

app.use("/", formRoute);

export default app;
