/*
  Warnings:

  - You are about to drop the column `point` on the `Users` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "point";

-- AlterTable
ALTER TABLE "Words" ADD COLUMN     "gameId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_id_fkey" FOREIGN KEY ("id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
