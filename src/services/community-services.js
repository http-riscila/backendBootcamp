import prisma from "../config/prisma-client.js";

async function create(communityData, userId) {
  const newCommunity = await prisma.community.create({
    data: {
      name: communityData.name,
      description: communityData.description,
      createdBy: userId,
    },
  });

  const communityMember = await prisma.communityMember.create({
    data: {
      userId: userId,
      communityId: newCommunity.id,
      isAdmin: true,
    },
  });

  return newCommunity;
}

async function getAll() {
  return prisma.community.findMany({
    select: {
      name: true,
      description: true,
    },
  });
}

async function getById(id) {
  return prisma.community.findUnique({
    where: { id },
    include: {
      members: true,
      items: true,
    },
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
