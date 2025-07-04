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
import authenticateProposal from "../middlewares/authenticate-proposal.js";

const { authorizeCommunityMember } = authorization;
const proposalsRouter = express.Router();

proposalsRouter.post(
  "/proposals",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  createProposal
);
proposalsRouter.get(
  "/proposals",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  getAllProposals
);
proposalsRouter.get(
  "/proposals/:id",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  getProposalById
);
proposalsRouter.put(
  "/proposals/:id",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  updateProposal
);
proposalsRouter.patch(
  "/proposals/:id",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  partiallyUpdateProposal
);
proposalsRouter.delete(
  "/proposals/:id",
  authenticateProposal,
  authenticateUser,
  authorizeCommunityMember,
  removeProposal
);

export default proposalsRouter;
