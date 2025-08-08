import prisma from "../config/prisma-client.js";

async function create(itemData, userId) {
  return await prisma.item.create({
    data: {
      name: itemData.name,
      description: itemData.description,
      category: itemData.category,
      status: itemData.status,
      imageUrl: itemData.imageUrl,
      communityId: itemData.communityId,
      createdBy: userId,
    },
  });
}

async function getAll() {
  return prisma.item.findMany();
}

async function getById(id) {
  return prisma.item.findUnique({
    where: { id },
  });
}

async function getByCategory(category) {
  return prisma.item.findMany({
    where: { category },
  });
}

async function getByUser(userId) {
  return prisma.item.findMany({
    where: { createdBy: userId },
  });
}

async function getByCommunity(communityId) {
  return prisma.item.findMany({
    where: { communityId },
  });
}

async function countByStatus(userId) {
  return prisma.item.count({
    where: { createdBy: userId, status: "AVAILABLE" },
  });
}

async function update(id, newItemData) {
  if (!newItemData) {
    throw new Error("New item data is required for update");
  }
  return prisma.item.update({
    where: { id },
    data: {
      name: newItemData.name,
      description: newItemData.description,
      categoryId: newItemData.categoryId,
      status: newItemData.status,
      imageUrl: newItemData.imageUrl,
      communityId: newItemData.communityId,
      createdBy: newItemData.createdBy,
    },
  });
}

async function partiallyUpdate(id, data) {
  return prisma.item.update({
    where: { id },
    data,
  });
}

async function remove(id) {
  return prisma.item.delete({
    where: { id },
  });
}

export {
  create,
  getAll,
  getById,
  getByCommunity,
  getByCategory,
  getByUser,
  countByStatus,
  update,
  partiallyUpdate,
  remove,
};
