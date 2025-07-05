import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  getItemsByCategory,
  updateItem,
  partiallyUpdateItem,
  deleteItem,
} from "../controllers/item-controllers.js";
import handleValidationErrors from "../middlewares/validation.js";
import {
  createItemValidator,
  updateItemValidator,
  partiallyUpdateItemValidator,
} from "../middlewares/item-validator.js";
import authenticateUser from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";

const { authorizeCommunityMember } = authorization;
const itemsRouter = express.Router();

itemsRouter.post(
  "/items",
  authenticateUser,
  authorizeCommunityMember,
  uploadMiddleware,
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
itemsRouter.get(
  "/items",
  authenticateUser,
  authorizeCommunityMember,
  getItemsByCategory
);
itemsRouter.put(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  uploadMiddleware,
  updateItemValidator,
  handleValidationErrors,
  updateItem
);
itemsRouter.patch(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  uploadMiddleware,
  partiallyUpdateItemValidator,
  handleValidationErrors,
  partiallyUpdateItem
);
itemsRouter.delete(
  "/items/:id",
  authenticateUser,
  authorizeCommunityMember,
  deleteItem
);

export default itemsRouter;
