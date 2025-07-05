import * as userService from "../services/user-services.js";

// Buscar todos os usuários
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Buscar usuário por ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar se email já está em uso por outro usuário
    const userWithEmail = await userService.getByEmail(email);
    if (userWithEmail && userWithEmail.id !== id) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const updatedUser = await userService.update(id, { name, email, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "User not found" });
    }

    // Se está atualizando email, verificar se já existe
    if (updateData.email) {
      const userWithEmail = await userService.getByEmail(updateData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }
    }

    const updatedUser = await userService.partiallyUpdate(id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Deletar usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Verificar se o usuário existe
    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await userService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  getAllUsers,
  getUserById,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
};
