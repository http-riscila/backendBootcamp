/*
  Warnings:

  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('BOOKS', 'ELECTRONICS', 'CLOTHING', 'TOYS', 'HOME_APPLIANCES', 'FURNITURE', 'SPORTS', 'MUSICAL_INSTRUMENTS', 'TOOLS', 'ART_SUPPLIES', 'STATIONERY', 'GAMES', 'GARDENING', 'VEHICLE_ACCESSORIES', 'PET_SUPPLIES', 'FOOD', 'HEALTH', 'BEAUTY', 'BABY_ITEMS', 'COLLECTIBLES', 'OTHER');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "category" "ItemCategory" NOT NULL;
