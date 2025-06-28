import {getProposal, createProposal} from '../services/proposalService.js';

async function createProposal(req, res) {
  const { ID_ITEM_OFFERED, ID_ITEM_DESIRED, ID_SENDER, ID_RECIPIENT, ID_COMMUNITY, STATUS } = req.body;

  try {
    const newProposal = await proposalService.createProposal(
      ID_ITEM_OFFERED,
      ID_ITEM_DESIRED,
      ID_SENDER,
      ID_RECIPIENT,
      ID_COMMUNITY,
      STATUS
    );
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(500).json({ error: 'Error creating proposal', details: error.message });
  }
};

export const getProposal = async (req, res) => {
  try {
    const proposals = await proposalService.getProposal();
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: 'Error when searching for proposals', details: error.message });
  }
};

export {createProposal, getProposal};
