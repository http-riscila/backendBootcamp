const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.createMembro = async (req, res) => {
  const { id_usuario, id_comunidade } = req.body;
  try {
    const membro = await prisma.membro.create({
      data: { id_usuario, id_comunidade },
    });
    res.status(201).json(membro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getMembros = async (req, res) => {
  try {
    const membros = await prisma.membro.findMany();
    res.json(membros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMembroById = async (req, res) => {
  const { id } = req.params;
  try {
    const membro = await prisma.membro.findUnique({
      where: { id: Number(id) },
    });
    if (!membro) {
      return res.status(404).json({ error: "Membro não encontrado" });
    }
    res.json(membro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMembro = async (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_comunidade } = req.body;
  try {
    const membro = await prisma.membro.update({
      where: { id: Number(id) },
      data: { id_usuario, id_comunidade },
    });
    res.json(membro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteMembro = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.membro.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Membro removido" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
