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
    const newItem = await create(itemData);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating a new item:", error);
    return res
      .status(500)
      .json({ error: "Error creating a new item", details: error.message });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await getAll();
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error getting items:", error);
    return res
      .status(500)
      .json({ error: "Error getting items", details: error.message });
  }
}

async function getItemById(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const item = await getById(parsedId);

    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error({
      error: "Error getting item by ID:",
      details: error.message,
    });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const newItemData = req.body;

    const existentItem = await prisma.item.findUnique({
      where: { id: parsedId },
    });

    if (existentItem) {
      const updatedItem = await update(parsedId, newItemData);
      return res.status(200).json(updatedItem);
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return res
      .status(500)
      .json({ error: "Error updating item", details: error.message });
  }
}

async function partiallyUpdateItem(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const data = req.body;

    const existentItem = await prisma.item.findUnique({
      where: { id: parsedId },
    });

    if (existentItem) {
      const partiallyUpdatedItem = await partiallyUpdate(parsedId, data);
      return res.status(200).json(partiallyUpdatedItem);
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error partially updating item:", error);
    return res
      .status(500)
      .json({ error: "Error partially updating item", details: error.message });
  }
}

async function removeItem(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const existentItem = await prisma.item.findUnique({
      where: { id: parsedId },
    });

    if (existentItem) {
      const removedItem = await remove(parsedId);
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error removing item:", error);
    return res
      .status(500)
      .json({ error: "Error removing item", details: error.message });
  }
}

export {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  partiallyUpdateItem,
  removeItem,
};
