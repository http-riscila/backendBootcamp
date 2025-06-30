import prisma from "../config/prisma-client.js";

async function create(communityData) {
  return prisma.community.update({
    where: { id },
    data: {
      name: communityData.name,
      description: communityData.description,
    },
  });
}

async function getAll() {
  return prisma.community.findMany();
}

async function getById(id) {
  return prisma.community.findUnique({
    where: { id },
  });
}

async function update(id, communityNewData) {
  return prisma.community.update({
    where: { id },
    data: {
      name: communityNewData.name,
      description: communityNewData.description,
    },
  });
}

async function partiallyUpdate(id, communityNewData) {
  return prisma.community.update({
    where: { id },
    data: {
      name: communityNewData.name,
      description: communityNewData.description,
    },
  });
}

async function remove(id) {
  return prisma.community.delete({
    where: { id },
  });
}

export { create, getAll, getById, update, partiallyUpdate, remove };
