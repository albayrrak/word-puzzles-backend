-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
