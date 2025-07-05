# Feira de Trocas Comunitárias 🛍️🤝

Uma API RESTful para facilitar trocas de itens entre membros de comunidades, promovendo colaboração e reutilização de objetos.

## 📚 Sumário

- [📦 Sobre o Projeto](#-sobre-o-projeto)
- [⚙️ Instalação](#-instalação)

---

## 📦 Sobre o Projeto

Este projeto foi desenvolvido como parte de uma atividade acadêmica com o objetivo de criar uma API completa para gerenciamento de comunidades e trocas de itens entre seus membros.

Os usuários podem:

- Criar e participar de comunidades
- Cadastrar itens para troca
- Propor trocas e aceitar propostas
- Autenticar e gerenciar seu perfil

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/http-riscila/backendBootcamp.git
cd backendBootcamp

# Instale as dependências
npm install

# Crie o arquivo .env com base no .env.example
cp .env.example .env

# Rode as migrations do banco de dados
npx prisma migrate dev

# Inicie o servidor
npm run dev
```
