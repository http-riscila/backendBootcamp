import express from "express";

import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  getCommunityByUser,
  countCommunityByCreator,
  updateCommunity,
  updatePartiallyCommunity,
  deleteCommunity,
  updateCommunityImageController,
  removeCommunityImageController,
} from "../controllers/community-controller.js";

import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";
import handleValidationErrors from "../middlewares/validation.js";
import communityImageUploadMiddleware from "../middlewares/communityImageUploadMiddleware.js";

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

communityRouter.get(
  "/communities/by-user/:userId",
  authenticateUser,
  authorizeCommunityMember,
  getCommunityByUser
);

communityRouter.get(
  "/communities/count/created-by/:userId",
  authenticateUser,
  countCommunityByCreator
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

// Rotas para upload de imagem da comunidade
communityRouter.post(
  "/communities/:id/image",
  authenticateUser,
  authorizeAdmin,
  handleValidationErrors,
  communityImageUploadMiddleware,
  updateCommunityImageController
);

communityRouter.delete(
  "/communities/:id/image",
  authenticateUser,
  authorizeAdmin,
  handleValidationErrors,
  removeCommunityImageController
);

export default communityRouter;
