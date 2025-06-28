import prisma from "@prisma/client"

const createProposal = async (
  ID_ITEM_OFFERED,
  ID_ITEM_DESIRED,
  ID_SENDER,
  ID_RECIPIENT,
  ID_COMMUNITY,
  STATUS
) => {
  if (!ID_ITEM_OFFERED || !ID_ITEM_DESIRED || !ID_SENDER || !ID_DESIRED || !ID_COMMUNITY) {
    throw new Error('All mandatory fields must be filled in');
  }

  const itemOffered = await prisma.ITEM.findUnique({ where: { ID: ID_ITEM_OFFERED } });
  const itemDesired = await prisma.ITEM.findUnique({ where: { ID: ID_ITEM_DESIRED } });
  const sender = await prisma.USUARIO.findUnique({ where: { ID: ID_SENDER } });
  const recipient = await prisma.USUARIO.findUnique({ where: { ID: ID_RECIPIENT } });
  const community = await prisma.COMUNIDADE.findUnique({ where: { ID: ID_COMMUNITY } });

  if (!itemOffered || !itemDesired || !sender || !recipient || !community) {
    throw new Error('One or more of the provided IDs were not found');
  }

  return await prisma.Proposal.create({
    data: {
      ID_ITEM_OFFERED,
      ID_ITEM_DESIRED,
      DATA_PROPOSTA: new Date(),
      STATUS: STATUS || 'pending',
      ID_SENDER,
      ID_DESIRED,
      ID_COMMUNITY,
    },
  });
};

const getProposal = async () => {
  return await prisma.Proposal.findMany({
    include: {
      ITEM_OFFERED: true,
      ITEM_DESIRED: true,
      SENDER: true,
      RECIPIENT: true,
      COMMUNITY: true,
    },
  });
};

export default { createProposal, getProposal };
