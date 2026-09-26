import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import groqResponse from "./groq.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDB();

app.get("/", (req, res) => {
    res.send("Virtual Assistant Backend is Running");
});

app.get("/groq", async (req, res) => {
    try {
        const prompt = req.query.prompt;

        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required"
            });
        }

        const data = await groqResponse(prompt);

        res.json(data);
    } catch (error) {
        console.error("Groq Route Error:", error);

        res.status(500).json({
            message: "Groq API error"
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});