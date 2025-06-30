import express from "express";
import {
  createItem,
  getAllItems,
  updateItem,
  partiallyUpdateItem,
  removeItem,
} from "../controllers/item-controllers.js";

const itemsRouter = express.Router();

itemsRouter.post("/items", createItem);
itemsRouter.get("/items", getAllItems);
itemsRouter.put("/items/:id", updateItem);
itemsRouter.patch("/items/:id", partiallyUpdateItem);
itemsRouter.delete("/items/:id", removeItem);

export default itemsRouter;
