import prisma from "../config/prisma-client.js";

async function create(proposalData) {
  return await prisma.proposal.create({
    data: {
      desiredItemId: proposalData.desiredItemId,
      offeredItemId: proposalData.offeredItemId,
      proposalDate: proposalData.proposalDate,
      status: proposalData.status,
      senderId: proposalData.senderId,
      recipientId: proposalData.recipientId,
      communityId: proposalData.communityId,
    },
  });
}

async function getAll() {
  return await prisma.proposal.findMany();
}

async function getById(id) {
  return await prisma.proposal.findUnique({
    where: { id },
  });
}

async function getBySender(userId) {
  return prisma.proposal.findMany({
    where: { senderId: userId },
    include: {
      desiredItem: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      offeredItem: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      sender: {
        select: {
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });
}

async function getByRecipient(userId) {
  return prisma.proposal.findMany({
    where: { recipientId: userId },
    include: {
      desiredItem: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      offeredItem: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      sender: {
        select: {
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });
}

async function countByUser(userId) {
  return prisma.proposal.count({
    where: {
      status: "ACCEPTED",
      OR: [{ senderId: userId }, { recipientId: userId }],
    },
  });
}

async function update(id, newProposalData) {
  return prisma.proposal.update({
    where: { id },
    data: {
      desiredItemId: newProposalData.desiredItemId,
      offeredItemId: newProposalData.offeredItemId,
      status: newProposalData.status,
      senderId: newProposalData.senderId,
      recipientId: newProposalData.recipientId,
      communityId: newProposalData.communityId,
    },
  });
}

async function partiallyUpdate(id, data) {
  return await prisma.proposal.update({
    where: { id },
    data,
  });
}

async function remove(id) {
  return await prisma.proposal.delete({
    where: { id },
  });
}

export {
  create,
  getAll,
  getById,
  getBySender,
  getByRecipient,
  countByUser,
  update,
  partiallyUpdate,
  remove,
};
