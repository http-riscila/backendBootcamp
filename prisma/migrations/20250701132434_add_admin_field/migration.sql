/*
  Warnings:

  - Added the required column `createdBy` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "createdBy" TEXT NOT NULL;
