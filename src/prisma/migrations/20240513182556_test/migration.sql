/*
  Warnings:

  - You are about to drop the `_GameToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameToWord" DROP CONSTRAINT "_GameToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToWord" DROP CONSTRAINT "_GameToWord_B_fkey";

-- DropTable
DROP TABLE "_GameToWord";
