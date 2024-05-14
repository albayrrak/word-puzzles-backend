/*
  Warnings:

  - You are about to drop the column `gameWord` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameWord";

-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "gameWordsId" TEXT;

-- CreateTable
CREATE TABLE "GameWords" (
    "id" TEXT NOT NULL,
    "gameId" TEXT,

    CONSTRAINT "GameWords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_gameWordsId_fkey" FOREIGN KEY ("gameWordsId") REFERENCES "GameWords"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameWords" ADD CONSTRAINT "GameWords_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
