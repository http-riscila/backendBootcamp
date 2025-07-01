import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  partiallyUpdateItem,
  removeItem,
} from "../controllers/item-controllers.js";
import handleValidationErrors from "../middlewares/validation.js";
import {
  createItemValidator,
  updateItemValidator,
  partiallyUpdateItemValidator,
} from "../middlewares/item-validator.js";
import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const { authorizeCommunityMember } = authorization;
const itemsRouter = express.Router();

itemsRouter.post(
  "/items",
  authenticateUser,
  authorizeCommunityMember,
  createItemValidator,
  handleValidationErrors,
  createItem
);
itemsRouter.get(
  "/items",
  authenticateUser,
  authorizeCommunityMember,
  getAllItems
);
itemsRouter.get(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  getItemById
);
itemsRouter.put(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  updateItemValidator,
  handleValidationErrors,
  updateItem
);
itemsRouter.patch(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  partiallyUpdateItemValidator,
  handleValidationErrors,
  partiallyUpdateItem
);
itemsRouter.delete(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  removeItem
);

export default itemsRouter;
