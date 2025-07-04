import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar usuário de teste
    const hashedPassword = await bcryptjs.hash("123456", 10);
    
    const user = await prisma.user.create({
      data: {
        name: "Usuário Teste",
        email: "teste@exemplo.com",
        password: hashedPassword,
      },
    });

    console.log("Usuário criado:", user);

    // Criar comunidade de teste
    const community = await prisma.community.create({
      data: {
        name: "Comunidade Teste",
        description: "Uma comunidade para testes",
        createdBy: user.id,
      },
    });

    console.log("Comunidade criada:", community);

    // Adicionar usuário como membro da comunidade
    const member = await prisma.communityMember.create({
      data: {
        userId: user.id,
        communityId: community.id,
        isAdmin: true,
      },
    });

    console.log("Membro adicionado:", member);

    console.log("\n=== DADOS PARA TESTE ===");
    console.log("Email:", user.email);
    console.log("Senha: 123456");
    console.log("ID da Comunidade:", community.id);
    console.log("========================");

  } catch (error) {
    console.error("Erro ao criar dados de teste:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
