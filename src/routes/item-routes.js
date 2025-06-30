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

const itemsRouter = express.Router();

itemsRouter.post(
  "/items",
  createItemValidator,
  handleValidationErrors,
  createItem
);
itemsRouter.get("/items", getAllItems);
itemsRouter.get("/items/:id", getItemById);
itemsRouter.put(
  "/items/:id",
  updateItemValidator,
  handleValidationErrors,
  updateItem
);
itemsRouter.patch(
  "/items/:id",
  partiallyUpdateItemValidator,
  handleValidationErrors,
  partiallyUpdateItem
);
itemsRouter.delete("/items/:id", removeItem);

export default itemsRouter;
