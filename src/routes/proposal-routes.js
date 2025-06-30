import express from "express";
import {
  createProposal,
  getAllProposals,
} from "../controllers/proposal-controllers.js";

const proposalsRouter = express.Router();

proposalsRouter.post("/proposals", createProposal);
proposalsRouter.get("/proposals", getAllProposals);

export default proposalsRouter;
