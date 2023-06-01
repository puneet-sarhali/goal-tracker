/*
  Warnings:

  - The values [COMMITS,LINES] on the enum `goalType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "goalType_new" AS ENUM ('commits', 'lines');
ALTER TABLE "goals" ALTER COLUMN "type" TYPE "goalType_new" USING ("type"::text::"goalType_new");
ALTER TYPE "goalType" RENAME TO "goalType_old";
ALTER TYPE "goalType_new" RENAME TO "goalType";
DROP TYPE "goalType_old";
COMMIT;

-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "days" SET DEFAULT ARRAY[]::INTEGER[];
