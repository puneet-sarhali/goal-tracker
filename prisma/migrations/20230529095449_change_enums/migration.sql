/*
  Warnings:

  - The values [DAILY,WEEKLY] on the enum `goalFrequency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "goalFrequency_new" AS ENUM ('daily', 'weekly');
ALTER TABLE "goals" ALTER COLUMN "frequency" TYPE "goalFrequency_new" USING ("frequency"::text::"goalFrequency_new");
ALTER TYPE "goalFrequency" RENAME TO "goalFrequency_old";
ALTER TYPE "goalFrequency_new" RENAME TO "goalFrequency";
DROP TYPE "goalFrequency_old";
COMMIT;
