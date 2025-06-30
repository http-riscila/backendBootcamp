import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.patch("/:id", partiallyUpdateUser);
router.delete("/:id", deleteUser);

export default router;