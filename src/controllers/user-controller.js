import * as userService from "../services/user-services.js";

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

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

async function getUserByEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await userService.getByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const newUserData = req.body;

    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userWithEmail = await userService.getByEmail(email);
    if (userWithEmail && userWithEmail.id !== id) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const updatedUser = await userService.update(id, newUserData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function partiallyUpdateUser(req, res) {
  try {
    const { id } = req.params;
    const newUserData = req.body;

    Object.keys(newUserData).forEach((key) => {
      if (
        typeof newUserData[key] === "string" &&
        newUserData[key].trim() === ""
      ) {
        delete newUserData[key];
      }
    });

    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newUserData.email) {
      const userWithEmail = await userService.getByEmail(newUserData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }
    }

    const updatedUser = await userService.partiallyUpdate(id, newUserData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error partially updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

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

async function updateUserProfileImage(req, res) {
  try {
    const { id } = req.params;

    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const updatedUser = await userService.updateProfileImage(
      id,
      req.file.buffer
    );

    res.status(200).json({
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function removeUserProfileImage(req, res) {
  try {
    const { id } = req.params;

    const existingUser = await userService.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!existingUser.profileImageUrl) {
      return res
        .status(400)
        .json({ message: "User has no profile image to remove" });
    }

    const updatedUser = await userService.removeProfileImage(id);

    res.status(200).json({
      message: "Profile image removed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error removing profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
  updateUserProfileImage,
  removeUserProfileImage,
};
