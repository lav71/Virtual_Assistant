import express from "express";
import { logIn, logOut, signUp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/logIn", logIn);
authRouter.post("/logOut", logOut);

export default authRouter;
