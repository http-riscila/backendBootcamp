import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
} from "../controllers/user-controller.js";
import authenticateUser from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/:id", authenticateUser, getUserById);
usersRouter.put("/users/:id", authenticateUser, updateUser);
usersRouter.patch("/users/:id", authenticateUser, partiallyUpdateUser);
usersRouter.delete("/users/:id", authenticateUser, deleteUser);

export default usersRouter;
