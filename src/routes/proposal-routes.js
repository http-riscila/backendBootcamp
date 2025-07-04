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
import {
  createProposalValidator,
  updateProposalValidator,
  partiallyUpdateProposalValidator,
} from "../middlewares/proposal-validator.js";
import handleValidationErrors from "../middlewares/validation.js";

const { authorizeCommunityMember } = authorization;
const proposalsRouter = express.Router();

proposalsRouter.post(
  "/proposals",
  authenticateUser,
  createProposalValidator,
  handleValidationErrors,
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
  updateProposalValidator,
  handleValidationErrors,
  updateProposal
);
proposalsRouter.patch(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  partiallyUpdateProposalValidator,
  handleValidationErrors,
  partiallyUpdateProposal
);
proposalsRouter.delete(
  "/proposals/:id",
  authenticateUser,
  authorizeCommunityMember,
  removeProposal
);

export default proposalsRouter;
