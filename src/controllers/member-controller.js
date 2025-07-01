import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/member-service.js";
import prisma from "../config/prisma-client.js";

async function createMember(req, res) {
  const memberData = req.body;
  try {
    const newMember = await create(memberData);
    res.status(201).json(newMember);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating a new member", details: error.message });
  }
}

async function getAllMembers(req, res) {
  try {
    const members = await getAll();
    res.json(members);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting members", details: error.message });
  }
}

async function getMemberById(req, res) {
  const { id } = req.params;
  try {
    const member = await prisma.communityMember.findUnique({
      where: { id: Number(id) },
    });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting member", details: error.message });
  }
}

async function updateMember(req, res) {
  const { id } = req.params;
  const memberNewData = req.body;
  try {
    const existentMember = await prisma.communityMember.findUnique({
      where: { id: Number(id) },
    });
    if (existentMember) {
      const updatedMember = await update(Number(id), memberNewData);
      return res.status(200).json(updatedMember);
    } else {
      return res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating member", details: error.message });
  }
}

async function updatePartiallyMember(req, res) {
  const { id } = req.params;
  const memberNewData = req.body;
  try {
    const existentMember = await prisma.communityMember.findUnique({
      where: { id: Number(id) },
    });
    if (existentMember) {
      const updatedMember = await update(Number(id), memberNewData);
      return res.status(200).json(updatedMember);
    } else {
      return res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    res.status(400).json({
      error: "Error partially updating member",
      details: error.message,
    });
  }
}

async function deleteMember(req, res) {
  const { id } = req.params;
  try {
    const existentMember = await prisma.communityMember.findUnique({
      where: { id: Number(id) },
    });
    if (existentMember) {
      const deletedMember = await remove(Number(id));
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  updatePartiallyMember,
  deleteMember,
};
