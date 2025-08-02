import express from 'express';
import { login, logout, registerUser } from '../controllers/auth-controller.js';
import {
  loginValidator,
  registerValidator,
} from '../middlewares/auth-validator.js';
import authenticateUser from '../middlewares/authenticate.js';
import handleValidationErrors from '../middlewares/validation.js';

const authRouter = express.Router();

authRouter.post(
  '/login',
  loginValidator,
  handleValidationErrors,
  login,
  authenticateUser
);
authRouter.post(
  '/register',
  registerValidator,
  handleValidationErrors,
  registerUser
);

authRouter.post('/logout', logout);

export default authRouter;
