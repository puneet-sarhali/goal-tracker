/*
  Warnings:

  - The `days` column on the `goals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `end` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lives" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "target" INTEGER NOT NULL,
DROP COLUMN "days",
ADD COLUMN     "days" INTEGER[];
