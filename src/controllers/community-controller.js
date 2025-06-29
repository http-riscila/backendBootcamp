import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const community = await prisma.community.create({
      data: { 
        name, 
        description,
      },
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommunity = async (req, res) => {
  try {
    const communities = await prisma.community.findMany();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommunityById = async (req, res) => {
  const { id } = req.params;

  try {
    const community = await prisma.community.findUnique({
      where: { id },
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    
    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const community = await prisma.community.update({
      where: { id },
      data: { 
        name, 
        description,
      },
    });

    res.json(community);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.community.delete({
      where: { id },
    });

    res.json({ message: "Community removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
