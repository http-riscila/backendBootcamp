import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/item-services.js";

async function createItem(req, res) {
  try {
    const itemData = req.body;
    const userId = req.user.id;
    const newItem = await create(itemData, userId);
    return res.status(201).json(newItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating a new item", details: error.message });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await getAll();
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting items", details: error.message });
  }
}

async function getItemById(req, res) {
  try {
    const { id } = req.params;

    const item = await getById(id);

    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error({
      message: "Error getting item by ID",
      details: error.message,
    });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;

    const newItemData = req.body;

    const existentItem = await getById(id);

    if (existentItem) {
      const updatedItem = await update(id, newItemData);
      return res.status(200).json(updatedItem);
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating item", details: error.message });
  }
}

async function partiallyUpdateItem(req, res) {
  try {
    const { id } = req.params;

    const data = req.body;

    const existentItem = await getById(id);

    if (existentItem) {
      const partiallyUpdatedItem = await partiallyUpdate(id, data);
      return res.status(200).json(partiallyUpdatedItem);
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error partially updating item",
      details: error.message,
    });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    const existentItem = await getById(id);

    if (existentItem) {
      const removedItem = await remove(id);
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing item", details: error.message });
  }
}

export {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  partiallyUpdateItem,
  deleteItem,
};
