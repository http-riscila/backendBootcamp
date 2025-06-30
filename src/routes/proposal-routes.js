import express from "express";
import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  partiallyUpdateProposal,
  removeProposal,
} from "../controllers/proposal-controllers.js";

const proposalsRouter = express.Router();

proposalsRouter.post("/proposals", createProposal);
proposalsRouter.get("/proposals", getAllProposals);
proposalsRouter.get("/proposals/:id", getProposalById);
proposalsRouter.put("/proposals/:id", updateProposal);
proposalsRouter.patch("/proposals/:id", partiallyUpdateProposal);
proposalsRouter.delete("/proposals/:id", removeProposal);

export default proposalsRouter;
