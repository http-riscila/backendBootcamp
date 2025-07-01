import express from "express";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  updatePartiallyMember,
  deleteMember,
} from "../controllers/member-controller.js";

const membersRouter = express.Router();

membersRouter.post("/members", createMember);
membersRouter.get("/members", getAllMembers);
membersRouter.get("/members/:id", getMemberById);
membersRouter.put("/members/:id", updateMember);
membersRouter.patch("/members/:id", updatePartiallyMember);
membersRouter.delete("/members/:id", deleteMember);

export default membersRouter;
