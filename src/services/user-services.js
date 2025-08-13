import prisma from '../config/prisma-client.js';
import { deleteImage, uploadImage } from '../utils/upload-utils.js';

async function getAll() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      profileImageUrl: true,
    },
  });
}

async function getById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      profileImageUrl: true,
      createdAt: true,
    },
  });
}

async function getByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function update(id, newUserData) {
  return await prisma.user.update({
    where: { id },
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password,
      bio: newUserData.bio,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      profileImageUrl: true,
    },
  });
}

async function partiallyUpdate(id, data) {
  const { password, ...safeData } = data;

  const updateData = password ? { ...safeData, password } : safeData;

  return await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
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
      bio: true,
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

  const imageUrl = await uploadImage(imageBuffer, 'users', `user_${userId}`);

  return prisma.user.update({
    where: { id: userId },
    data: { profileImageUrl: imageUrl },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
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
      bio: true,
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
