/*
  Warnings:

  - You are about to drop the column `gameId` on the `Words` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_id_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameWord" TEXT[];

-- AlterTable
ALTER TABLE "Words" DROP COLUMN "gameId";
