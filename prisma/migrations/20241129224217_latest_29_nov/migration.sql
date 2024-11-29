/*
  Warnings:

  - You are about to drop the column `managmentType` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "managmentType",
ADD COLUMN     "managementType" VARCHAR(120);
