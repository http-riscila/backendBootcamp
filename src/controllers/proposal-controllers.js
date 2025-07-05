import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/proposal-services.js";

async function createProposal(req, res) {
  const proposalData = req.body;
  try {
    const newProposal = await create(proposalData);
    res.status(201).json(newProposal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating a proposal", details: error.message });
  }
}

async function getAllProposals(req, res) {
  try {
    const proposals = await getAll();
    res.status(200).json(proposals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting proposals", details: error.message });
  }
}

async function getProposalById(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const proposal = await getById(parsedId);

    if (proposal) {
      res.status(200).json(proposal);
    } else {
      res.status(404).json({ message: "Proposal not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting proposal", details: error.message });
  }
}

async function updateProposal(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const newProposalData = req.body;

    const existentProposal = await getById(parsedId);

    if (!existentProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const updatedProposal = await update(parsedId, newProposalData);
    res.status(200).json(updatedProposal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating proposal", details: error.message });
  }
}

async function partiallyUpdateProposal(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const data = req.body;

    const existentProposal = await getById(parsedId);

    if (!existentProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const updatedProposal = await partiallyUpdate(parsedId, data);
    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(500).json({
      message: "Error partially updating proposal",
      details: error.message,
    });
  }
}

async function removeProposal(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const existentProposal = await getById(parsedId);

    if (!existentProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const deletedProposal = await remove(parsedId);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing proposal", details: error.message });
  }
}
export {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  partiallyUpdateProposal,
  removeProposal,
};
