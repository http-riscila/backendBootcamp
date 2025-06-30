/*
  Warnings:

  - You are about to drop the column `comunidadeId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `criadorId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Comunidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembroComunidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `communityId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_criadorId_fkey";

-- DropForeignKey
ALTER TABLE "MembroComunidade" DROP CONSTRAINT "MembroComunidade_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "MembroComunidade" DROP CONSTRAINT "MembroComunidade_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_destinatarioId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_itemDesejadoId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_itemOferecidoId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_remetenteId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "comunidadeId",
DROP COLUMN "criadorId",
DROP COLUMN "descricao",
DROP COLUMN "titulo",
ADD COLUMN     "communityId" TEXT NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ItemStatus" NOT NULL;

-- DropTable
DROP TABLE "Comunidade";

-- DropTable
DROP TABLE "MembroComunidade";

-- DropTable
DROP TABLE "Proposta";

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "StatusProposta";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "desiredItemId" TEXT NOT NULL,
    "offeredItemId" TEXT NOT NULL,
    "proposalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ProposalStatus" NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_desiredItemId_fkey" FOREIGN KEY ("desiredItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_offeredItemId_fkey" FOREIGN KEY ("offeredItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
