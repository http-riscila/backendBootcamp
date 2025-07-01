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
import authenticateUser from "../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.post("/users", createUser);
usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/:id", authenticateUser, getUserById);
usersRouter.put("/users/:id", authenticateUser, updateUser);
usersRouter.patch("/users/:id", authenticateUser, partiallyUpdateUser);
usersRouter.delete("/users/:id", authenticateUser, deleteUser);
usersRouter.post("/login", login, authenticateUser);

export default usersRouter;
