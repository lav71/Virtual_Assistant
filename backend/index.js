import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import geminiResponse from "./gemini.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDB();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/gemini", async (req, res) => {
    let prompt = req.query.prompt;

    let data = await geminiResponse(prompt);

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});