import { create, getAll } from "../services/proposal-services.js";

async function createProposal(req, res) {
  const proposalData = req.body;

  try {
    const newProposal = await create(proposalData);
    res.status(201).json(newProposal);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating a proposal", details: error.message });
  }
}

async function getAllProposals(req, res) {
  try {
    const proposals = await getAll();
    res.status(200).json(proposals);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting proposals", details: error.message });
  }
}

export { createProposal, getAllProposals };
