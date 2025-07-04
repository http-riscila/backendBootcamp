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

import {
  createMemberValidator,
  updateMemberValidator,
} from "../validators/membroValidator.js";

import { validationResult } from "express-validator";

const membersRouter = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

membersRouter.post(
  "/members",
  authenticateUser,
  createMemberValidator,
  validateRequest,
  createMember
);

membersRouter.get(
  "/members",
  authenticateUser,
  authorizeAdmin,
  getAllMembers
);

membersRouter.get(
  "/members/:id",
  authenticateUser,
  getMemberById
);

membersRouter.put(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  updateMemberValidator,
  validateRequest,
  updateMember
);

membersRouter.patch(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  updateMemberValidator,
  validateRequest,
  updatePartiallyMember
);

membersRouter.delete(
  "/members/:id",
  authenticateUser,
  authorizeCommunityMember,
  deleteMember
);

export default membersRouter;
