import express from "express";
import * as communityController from "../controllers/community-controller.js";

const communityRouter = express.Router();

communityRouter.post("/communities", communityController.createCommunity);
communityRouter.get("/communities", communityController.getCommunity);
communityRouter.get("/communities/:id", communityController.getCommunityById);
communityRouter.put("/communities/:id", communityController.updateCommunity);
communityRouter.delete("/communities/:id", communityController.deleteCommunity);

export default communityRouter;
