/*
  Warnings:

  - You are about to drop the `_GameWords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameWords" DROP CONSTRAINT "_GameWords_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameWords" DROP CONSTRAINT "_GameWords_B_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "words" TEXT[];

-- DropTable
DROP TABLE "_GameWords";
