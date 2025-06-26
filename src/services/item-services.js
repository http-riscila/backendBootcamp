import prisma from "../config/prisma-client.js";

async function create(itemData) {
  return prisma.item.create({
    data: {
      name: itemData.name,
      description: itemData.description,
      status: itemData.status,
      communityId: itemData.communityId,
      createdBy: itemData.createdBy,
    },
  });
}

async function getAll() {
  return prisma.item.findMany();
}

async function update(id, newItemData) {
  return prisma.item.update({
    where: { id },
    data: {
      name: newItemData.name,
      description: newItemData.description,
      status: newItemData.status,
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

export { create, getAll, update, partiallyUpdate, remove };
