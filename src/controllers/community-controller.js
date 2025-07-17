import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
  updateCommunityImage,
  removeCommunityImage,
} from "../services/community-services.js";

async function createCommunity(req, res) {
  const userId = req.user.id;
  const communityData = req.body;
  try {
    const newCommunity = await create(communityData, userId);
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

async function updateCommunityImageController(req, res) {
  try {
    const { id } = req.params;

    const existingCommunity = await getById(id);
    if (!existingCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const updatedCommunity = await updateCommunityImage(id, req.file.buffer);

    res.status(200).json({
      message: "Community image updated successfully",
      community: updatedCommunity,
    });
  } catch (error) {
    console.error("Error updating community image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function removeCommunityImageController(req, res) {
  try {
    const { id } = req.params;

    const existingCommunity = await getById(id);
    if (!existingCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!existingCommunity.imageUrl) {
      return res
        .status(400)
        .json({ message: "Community has no image to remove" });
    }

    const updatedCommunity = await removeCommunityImage(id);

    res.status(200).json({
      message: "Community image removed successfully",
      community: updatedCommunity,
    });
  } catch (error) {
    console.error("Error removing community image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunity,
  updatePartiallyCommunity,
  deleteCommunity,
  updateCommunityImageController,
  removeCommunityImageController,
};
