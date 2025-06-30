import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/community-services.js";
import prisma from "../config/prisma-client.js";

async function createCommunity(req, res) {
  const communityData = req.body;
  try {
    const newCommunity = await create(communityData);
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(400).json({
      error: "Error creating a new community",
      details: error.message,
    });
  }
}

async function getAllCommunities(req, res) {
  try {
    const communities = await getAll();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCommunityById = async (req, res) => {
  const { id } = req.params;
  const parsedId = Number(id);

  try {
    const community = await prisma.community.findUnique({
      where: { parsedId },
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const communityNewData = req.body;

    const existentCommunity = await prisma.community.findUnique({
      where: { id: parsedId },
    });
    if (existentCommunity) {
      const updatedCommunity = await update(parsedId, communityNewData);
      return res.status(200).json(updatedCommunity);
    } else {
      return res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updatePartiallyCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const communityNewData = req.body;

    const existentCommunity = await prisma.community.findUnique({
      where: { id: parsedId },
    });

    if (existentCommunity) {
      const updatedCommunity = await partiallyUpdate(
        parsedId,
        communityNewData
      );
      return res.status(200).json(updatedCommunity);
    } else {
      return res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating community", details: error.message });
  }
}

async function deleteCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const existentCommunity = await prisma.community.findUnique({
      where: { id: parsedId },
    });

    if (existentCommunity) {
      const deletedCommunity = await remove(parsedId);
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting community", details: error.message });
  }
}

export {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunity,
  updatePartiallyCommunity,
  deleteCommunity,
};
