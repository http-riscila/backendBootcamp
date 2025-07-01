import prisma from "../config/prisma-client.js";

async function getAll() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
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
    },
  });
}

async function partiallyUpdate(id, data) {
  // Remove senha do objeto se estiver presente e não for para atualização
  const { password, ...safeData } = data;

  const updateData = password
    ? { ...safeData, password } // Em produção, hashear a senha
    : safeData;

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

async function remove(id) {
  return prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export { create, getAll, getById, getByEmail, update, partiallyUpdate, remove };
