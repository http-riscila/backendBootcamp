import prisma from "../config/prisma-client";

export default async function register(userData) {
  return prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
