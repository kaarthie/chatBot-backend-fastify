/*
  Warnings:

  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `profile`,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;
