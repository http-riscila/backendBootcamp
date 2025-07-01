import express from "express";
import { login, registerUser } from "../controllers/auth-controller.js";
import handleValidationErrors from "../middlewares/validation.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/auth-validator.js";

const authRouter = express.Router();

authRouter.post("/login", loginValidator, handleValidationErrors, login);
authRouter.post(
  "/register",
  registerValidator,
  handleValidationErrors,
  registerUser
);

export default authRouter;
