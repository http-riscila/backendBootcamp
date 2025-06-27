const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// UPDATE
exports.updateProposal = async (req, res) => {
  const { id } = req.params;
  const {
    desired_item_id,
    offered_item_id,
    status,
    sender_id,
    recipient_id,
    community_id
  } = req.body;

  try {
    const proposal = await prisma.proposal.update({
      where: { id },
      data: {
        desired_item_id,
        offered_item_id,
        status,
        sender_id,
        recipient_id,
        community_id
      }
    });
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteProposal = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.proposal.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
