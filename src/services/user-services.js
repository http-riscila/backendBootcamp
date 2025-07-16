import prisma from "../config/prisma-client.js";
import { uploadImage, deleteImage } from "../utils/upload-utils.js";

async function getAll() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

async function getById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

async function getByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function update(id, newUserData) {
  return prisma.user.update({
    where: { id },
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

async function partiallyUpdate(id, data) {
  const { password, ...safeData } = data;

  const updateData = password ? { ...safeData, password } : safeData;

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

async function remove(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { profileImageUrl: true },
  });

  if (user?.profileImageUrl) {
    await deleteImage(user.profileImageUrl);
  }

  return prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

async function updateProfileImage(userId, imageBuffer) {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImageUrl: true },
  });

  if (currentUser?.profileImageUrl) {
    await deleteImage(currentUser.profileImageUrl);
  }

  const imageUrl = await uploadImage(imageBuffer, "users", `user_${userId}`);

  return prisma.user.update({
    where: { id: userId },
    data: { profileImageUrl: imageUrl },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

/**
 * Remove a foto de perfil do usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<Object>} - Usuário atualizado
 */
async function removeProfileImage(userId) {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImageUrl: true },
  });

  if (currentUser?.profileImageUrl) {
    await deleteImage(currentUser.profileImageUrl);
  }

  return prisma.user.update({
    where: { id: userId },
    data: { profileImageUrl: null },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
    },
  });
}

export {
  getAll,
  getById,
  getByEmail,
  update,
  partiallyUpdate,
  remove,
  updateProfileImage,
  removeProfileImage,
};
