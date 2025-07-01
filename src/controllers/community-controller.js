import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/community-services.js";
import { create as createCommunityMember } from "../services/member-service.js";

async function createCommunity(req, res) {
  const userId = req.user.id;
  const communityData = req.body;
  try {
    const newCommunity = await create(communityData, userId);
    if (newCommunity) {
      const communityMember = await createCommunityMember({
        data: {
          userId: userId,
          communityId: newCommunity.id,
          isAdmin: true,
        },
      });
    }
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(400).json({
      message: "Error creating a new community",
      details: error.message,
    });
  }
}

async function getAllCommunities(req, res) {
  try {
    const communities = await getAll();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({
      message: "Error getting communities",
      details: error.message,
    });
  }
}

async function getCommunityById(req, res) {
  const { id } = req.params;
  const parsedId = Number(id);

  try {
    const community = await getById(parsedId);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({
      message: "Error getting community",
      details: error.message,
    });
  }
}

async function updateCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const communityNewData = req.body;

    const existentCommunity = await getById(parsedId);

    if (existentCommunity) {
      const updatedCommunity = await update(parsedId, communityNewData);
      return res.status(200).json(updatedCommunity);
    } else {
      return res.status(404).json({ message: "Community not found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error updating community",
      details: error.message,
    });
  }
}

async function updatePartiallyCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const communityNewData = req.body;

    const existentCommunity = await getById(parsedId);

    if (existentCommunity) {
      const updatedCommunity = await partiallyUpdate(
        parsedId,
        communityNewData
      );
      return res.status(200).json(updatedCommunity);
    } else {
      return res.status(404).json({ message: "Community not found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error partially updating community",
      details: error.message,
    });
  }
}

async function deleteCommunity(req, res) {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    const existentCommunity = await getById(parsedId);

    if (existentCommunity) {
      const deletedCommunity = await remove(parsedId);
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Community not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting community", details: error.message });
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
