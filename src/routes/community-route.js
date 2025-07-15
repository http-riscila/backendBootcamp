import express from "express";

import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunity,
  updatePartiallyCommunity,
  deleteCommunity,
} from "../controllers/community-controller.js";

import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";
import handleValidationErrors from "../middlewares/validation.js";

import {
  createCommunityValidator,
  updateCommunityValidator,
  partiallyUpdateCommunityValidator,
} from "../middlewares/community-validator.js";

const { authorizeCommunityMember, authorizeAdmin } = authorization;

const communityRouter = express.Router();

communityRouter.post(
  "/communities",
  authenticateUser,
  createCommunityValidator,
  handleValidationErrors,
  createCommunity
);

communityRouter.get("/communities", authenticateUser, getAllCommunities);

communityRouter.get(
  "/communities/:id",
  authenticateUser,
  authorizeCommunityMember,
  handleValidationErrors,
  getCommunityById
);

communityRouter.put(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  updateCommunityValidator,
  handleValidationErrors,
  updateCommunity
);

communityRouter.patch(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  partiallyUpdateCommunityValidator,
  handleValidationErrors,
  updatePartiallyCommunity
);

communityRouter.delete(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  handleValidationErrors,
  deleteCommunity
);

export default communityRouter;
