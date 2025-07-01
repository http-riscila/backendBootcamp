import * as userService from "../services/user-services.js";
import bcrypt from "bcryptjs";

// Criar novo usuário
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Verificar se email já existe
    const existingUser = await userService.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: "Email já está em uso",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await userService.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Buscar todos os usuários
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Buscar usuário por ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Atualizar usuário completo
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Verificar se o usuário existe
    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se email já está em uso por outro usuário
    const userWithEmail = await userService.getByEmail(email);
    if (userWithEmail && userWithEmail.id !== id) {
      return res.status(400).json({
        error: "Email já está em uso por outro usuário",
      });
    }

    const updatedUser = await userService.update(id, { name, email, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Atualizar usuário parcial
async function partiallyUpdateUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verificar se o usuário existe
    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Se está atualizando email, verificar se já existe
    if (updateData.email) {
      const userWithEmail = await userService.getByEmail(updateData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return res.status(400).json({
          error: "Email já está em uso por outro usuário",
        });
      }
    }

    const updatedUser = await userService.partiallyUpdate(id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Deletar usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Verificar se o usuário existe
    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const deletedUser = await userService.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
};
