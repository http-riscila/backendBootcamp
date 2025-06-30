import express from "express";
import {
  createProposal,
  getProposal,
} from "../controllers/proposal-controllers.js";

const proposalsRouter = express.Router();

router.post("/proposals", createProposal);
router.get("/proposals", getProposal);

export default proposalsRouter;
