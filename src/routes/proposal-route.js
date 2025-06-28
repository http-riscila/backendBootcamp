import express from "express";
import proposalController from "../controllers/proposal-controller.js";

const proposalRouter = express.Router();

// Routes for Proposals
proposalRouter.patch("/proposals/:id/status", proposalController.updateStatus);
proposalRouter.delete("/proposals/:id", proposalController.delete);

export default proposalRouter; 