import express from "express";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  updatePartiallyMember,
  deleteMember,
} from "../controllers/member-controller.js";
import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const { authorizeCommunityMember, authorizeAdmin } = authorization;
const membersRouter = express.Router();

membersRouter.post("/members", authenticateUser, createMember);
membersRouter.get("/members", authenticateUser, authorizeAdmin, getAllMembers);
membersRouter.get("/members/:id", authenticateUser, getMemberById);
membersRouter.put(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  updateMember
);
membersRouter.patch(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  updatePartiallyMember
);
membersRouter.delete(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  deleteMember
);

export default membersRouter;
