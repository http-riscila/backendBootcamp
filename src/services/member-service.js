import prisma from '../config/prisma-client.js';

async function create(memberData) {
  return await prisma.communityMember.create({
    data: {
      userId: memberData.userId,
      communityId: memberData.communityId,
      isAdmin: memberData.isAdmin,
    },
  });
}

async function getAll() {
  return await prisma.communityMember.findMany();
}

async function getById(id) {
  return await prisma.communityMember.findUnique({
    where: { id },
  });
}

async function getByCommunity(communityId) {
  return await prisma.communityMember.findMany({
    where: { communityId },
  });
}

async function countByCommunity(communityId) {
  return await prisma.communityMember.count({
    where: { communityId },
  });
}

async function update(id, newMemberData) {
  return await prisma.communityMember.update({
    where: { id },
    data: {
      userId: newMemberData.userId,
      communityId: newMemberData.communityId,
    },
  });
}

async function partiallyUpdate(id, newMemberData) {
  return await prisma.communityMember.update({
    where: { id },
    data: {
      userId: newMemberData.userId,
      communityId: newMemberData.communityId,
    },
  });
}

async function remove(id) {
  return await prisma.communityMember.delete({
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
