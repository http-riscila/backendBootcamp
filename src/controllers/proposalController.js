import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProposal = async (req, res) => {
  const { ID_ITEM_OFFERED, ID_ITEM_DESIRED, ID_SENDER, ID_RECIPIENT, ID_COMMUNITY, STATUS } = req.body;

  if (!ID_ITEM_OFFERED || !ID_ITEM_DESIRED || !ID_SENDER || !ID_RECIPIENT || !ID_COMMUNITY) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  try {
    const itemOffered = await prisma.ITEM.findUnique({ where: { ID: ID_ITEM_OFFERED } });
    const itemDesired = await prisma.ITEM.findUnique({ where: { ID: ID_ITEM_DESIRED } });
    const sender = await prisma.USUARIO.findUnique({ where: { ID: ID_SENDER } });
    const recipient = await prisma.USUARIO.findUnique({ where: { ID: ID_RECIPIENT } });
    const community = await prisma.COMUNIDADE.findUnique({ where: { ID: ID_COMMUNITY } });

    if (!itemOffered || !itemDesired || !sender || !recipient || !community) {
      return res.status(404).json({ error: 'Um ou mais IDs fornecidos não foram encontrados' });
    }

    const newProposal = await prisma.PROPOSTA.create({
      data: {
        ID_ITEM_OFFERED,
        ID_ITEM_DESIRED,
        DATE_PROPOSAL: new Date(),
        STATUS: STATUS || 'pending',
        ID_SENDER,
        ID_RECIPIENT,
        ID_COMMUNITY,
      },
    });

    res.status(201).json(newProposal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar proposta', details: error.message });
  }
};

export const getProposal = async (req, res) => {
  try {
    const proposal = await prisma.PROPOSTA.findMany({
      include: {
        ITEM_OFFERED: true,
        ITEM_DESIRED: true,
        SENDER: true,
        RECIPIENT: true,
        COMMUNITY: true,
      },
    });

    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar propostas', details: error.message });
  }
};

module.exports = { createProposal, getProposal };