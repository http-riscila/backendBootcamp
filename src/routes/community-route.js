import express from "express";
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunity,
  updatePartiallyCommunity,
  deleteCommunity,
} from "../controllers/community-controller.js";

const communityRouter = express.Router();

communityRouter.post("/communities", createCommunity);
communityRouter.get("/communities", getAllCommunities);
communityRouter.get("/communities/:id", getCommunityById);
communityRouter.put("/communities/:id", updateCommunity);
communityRouter.patch("/communities/:id", updatePartiallyCommunity);
communityRouter.delete("/communities/:id", deleteCommunity);

export default communityRouter;
