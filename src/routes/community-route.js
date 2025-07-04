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

const { authorizeCommunityMember, authorizeAdmin } = authorization;
const communityRouter = express.Router();

communityRouter.post("/communities", authenticateUser, createCommunity);
communityRouter.get("/communities", authenticateUser, getAllCommunities);
communityRouter.get(
  "/communities/:id",
  authenticateUser,
  authorizeCommunityMember,
  getCommunityById
);
communityRouter.put(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  updateCommunity
);
communityRouter.patch(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  updatePartiallyCommunity
);
communityRouter.delete(
  "/communities/:id",
  authenticateUser,
  authorizeAdmin,
  deleteCommunity
);

export default communityRouter;
