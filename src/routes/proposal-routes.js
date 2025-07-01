import express from "express";
import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  partiallyUpdateProposal,
  removeProposal,
} from "../controllers/proposal-controllers.js";
import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const { authorizeCommunityMember } = authorization;
const proposalsRouter = express.Router();

proposalsRouter.post(
  "/proposals",
  authenticateUser,
  authorizeCommunityMember,
  createProposal
);
proposalsRouter.get(
  "/proposals",
  authenticateUser,
  authorizeCommunityMember,
  getAllProposals
);
proposalsRouter.get(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  getProposalById
);
proposalsRouter.put(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  updateProposal
);
proposalsRouter.patch(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  partiallyUpdateProposal
);
proposalsRouter.delete(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  removeProposal
);

export default proposalsRouter;
