import prisma from "@prisma/client";

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

async function get() {
  return await prisma.proposal.findMany();
}

export default { create, get };
