import prisma from "../config/prisma-client.js";

async function create(memberData) {
  return prisma.communityMember.create({
    data: {
      userId: memberData.userId,
      communityId: memberData.communityId,
      isAdmin: memberData.isAdmin || false,
    },
  });
}

async function getAll() {
  return prisma.communityMember.findMany();
}

async function getById(id) {
  return prisma.communityMember.findUnique({
    where: { id },
  });
}

async function getByCommunity(communityId) {
  return prisma.communityMember.findMany({
    where: { communityId },
  });
}

async function countByCommunity(communityId) {
  return prisma.communityMember.count({
    where: { communityId },
  });
}

async function update(id, newMemberData) {
  return prisma.communityMember.update({
    where: { id },
    data: {
      userId: newMemberData.userId,
      communityId: newMemberData.communityId,
    },
  });
}

async function partiallyUpdate(id, newMemberData) {
  return prisma.communityMember.update({
    where: { id },
    data: {
      userId: newMemberData.userId,
      communityId: newMemberData.communityId,
    },
  });
}

async function remove(id) {
  return prisma.communityMember.delete({
    where: { id },
  });
}

export {
  create,
  getAll,
  getById,
  getByCommunity,
  countByCommunity,
  update,
  partiallyUpdate,
  remove,
};
