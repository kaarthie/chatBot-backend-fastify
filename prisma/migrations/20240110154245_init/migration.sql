/*
  Warnings:

  - You are about to drop the column `location_name` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `bed_type` on the `Room` table. All the data in the column will be lost.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Location` DROP COLUMN `location_name`,
    ADD COLUMN `locationName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `bed_type`,
    ADD COLUMN `bedType` VARCHAR(191) NOT NULL;
