import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma-client.js';

async function main() {
  console.log('Iniciando o processo de seed...');

  console.log('Limpando dados de itens existentes...');
  await prisma.community.deleteMany({});
  await prisma.user.deleteMany({});

  const usersToCreate = [
    {
      // Cria um usuario com uuid definido já
      id: '423e4567-e89b-12d3-a456-426614174000',
      name: 'Wellington',
      email: 'wellington.nunes10@hotmail.com',
      password: await bcrypt.hash('Wln@h1n1', 10),
      bio: 'Administrador do sistema',
    },
    {
      id: '423e4567-e89b-12d3-a456-426614174001',
      name: 'João',
      email: 'joao.silva@example.com',
      password: await bcrypt.hash('J0@oS1lv4', 10),
      bio: 'Entusiasta de tecnologia',
    },
  ];

  console.log('Criando usuário...');
  for (const user of usersToCreate) {
    await prisma.user.create({
      data: user,
    });
  }

  // Comunidades de exemplo
  const communities = [
    {
      imageUrl: '',
      name: 'Bazar de roupas BR',
      description:
        'Comunidade para troca de roupas, sapatos e acessórios em todo Brasil',
      createdBy: '423e4567-e89b-12d3-a456-426614174001',
    },
    {
      imageUrl: '',
      name: 'Livros e Cultura',
      description:
        'Troque livros, CDs, DVDs e outros itens culturais novos ou usados',
      createdBy: '423e4567-e89b-12d3-a456-426614174001',
    },
    {
      imageUrl: '',
      name: 'Casa e decoração',
      description: 'Comunidade para troca de itens de casa e decoração',
      createdBy: '423e4567-e89b-12d3-a456-426614174001',
    },
  ];

  console.log('Criando comunidades...');
  for (const community of communities) {
    await prisma.community.create({
      data: community,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
