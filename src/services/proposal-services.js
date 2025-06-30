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

export default { create, getAll };
