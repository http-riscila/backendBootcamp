import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
} from "../controllers/user-controller.js";
import authenticateUser from "../middlewares/authenticate.js";
import {
  validateUpdateUser,
  validatePartialUpdateUser,
} from "../middlewares/user-validator.js";
import handleValidationErrors from "../middlewares/validation.js";

const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/:id", authenticateUser, getUserById);
usersRouter.put(
  "/users/:id",
  authenticateUser,
  validateUpdateUser,
  handleValidationErrors,
  updateUser
);
usersRouter.patch(
  "/users/:id",
  authenticateUser,
  validatePartialUpdateUser,
  handleValidationErrors,
  partiallyUpdateUser
);
usersRouter.delete("/users/:id", authenticateUser, deleteUser);

export default usersRouter;
