import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
  login,
} from "../controllers/user-controller.js";

const usersRouter = express.Router();

usersRouter.post("/users", createUser);
usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/:id", getUserById);
usersRouter.put("/users/:id", updateUser);
usersRouter.patch("/users/:id", partiallyUpdateUser);
usersRouter.delete("/users/:id", deleteUser);
usersRouter.post("/login", login);

export default usersRouter;
