/*
  Warnings:

  - You are about to drop the column `status` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `words` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "status",
DROP COLUMN "words";

-- CreateTable
CREATE TABLE "_GameToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToWord_AB_unique" ON "_GameToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToWord_B_index" ON "_GameToWord"("B");

-- AddForeignKey
ALTER TABLE "_GameToWord" ADD CONSTRAINT "_GameToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToWord" ADD CONSTRAINT "_GameToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
