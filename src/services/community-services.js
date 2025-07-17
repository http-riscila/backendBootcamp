import prisma from "../config/prisma-client.js";
import { create as createCommunityMember } from "../services/member-service.js";
import { uploadImage, deleteImage } from "../utils/upload-utils.js";

async function create(communityData, userId) {
  const newCommunity = await prisma.community.create({
    data: {
      name: communityData.name,
      description: communityData.description,
      createdBy: userId,
    },
  });

  await createCommunityMember({
    userId: userId,
    communityId: newCommunity.id,
    isAdmin: true,
  });
  return newCommunity;
}

async function getAll() {
  return prisma.community.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
    },
  });
}

async function getById(id) {
  return prisma.community.findUnique({
    where: { id },
    include: {
      members: true,
      items: true,
    },
  });
}

async function countByCreator(userId) {
  return prisma.community.count({
    where: { createdBy: userId },
  });
}

async function update(id, communityNewData) {
  return prisma.community.update({
    where: { id },
    data: {
      name: communityNewData.name,
      description: communityNewData.description,
    },
  });
}

async function partiallyUpdate(id, communityNewData) {
  return prisma.community.update({
    where: { id },
    data: {
      name: communityNewData.name,
      description: communityNewData.description,
    },
  });
}

async function remove(id) {
  const community = await prisma.community.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  if (community?.imageUrl) {
    await deleteImage(community.imageUrl);
  }

  return prisma.community.delete({
    where: { id },
  });
}

/**
 * Atualiza a foto da comunidade
 * @param {string} communityId - ID da comunidade
 * @param {Buffer} imageBuffer - Buffer da imagem
 * @returns {Promise<Object>} - Comunidade atualizada
 */
async function updateCommunityImage(communityId, imageBuffer) {
  const currentCommunity = await prisma.community.findUnique({
    where: { id: communityId },
    select: { imageUrl: true },
  });

  if (currentCommunity?.imageUrl) {
    await deleteImage(currentCommunity.imageUrl);
  }

  const imageUrl = await uploadImage(
    imageBuffer,
    "communities",
    `community_${communityId}`
  );

  return prisma.community.update({
    where: { id: communityId },
    data: { imageUrl: imageUrl },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      createdBy: true,
    },
  });
}

/**
 * Remove a foto da comunidade
 * @param {string} communityId - ID da comunidade
 * @returns {Promise<Object>} - Comunidade atualizada
 */
async function removeCommunityImage(communityId) {
  const currentCommunity = await prisma.community.findUnique({
    where: { id: communityId },
    select: { imageUrl: true },
  });

  if (currentCommunity?.imageUrl) {
    await deleteImage(currentCommunity.imageUrl);
  }

  return prisma.community.update({
    where: { id: communityId },
    data: { imageUrl: null },
    select: {
      id: true,
      name: true,
      description: true,
      imageUrl: true,
      createdBy: true,
    },
  });
}

export {
  create,
  getAll,
  getById,
  countByCreator,
  update,
  partiallyUpdate,
  remove,
  updateCommunityImage,
  removeCommunityImage,
};
