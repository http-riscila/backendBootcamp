import prisma from '../config/prisma-client.js';

async function register(userData) {
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      bio: userData.bio,
    },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
    },
  });
}

export { register };
