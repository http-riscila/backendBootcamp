import express from "express";
import { login, registerUser } from "../controllers/auth-controller.js";
import handleValidationErrors from "../middlewares/validation.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/auth-validator.js";
import authenticateUser from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  login
);
authRouter.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  registerUser
);

export default authRouter;
