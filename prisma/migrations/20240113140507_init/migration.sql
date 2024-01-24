/*
  Warnings:

  - Added the required column `adult` to the `BookingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child` to the `BookingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `BookingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BookingHistory` ADD COLUMN `adult` INTEGER NOT NULL,
    ADD COLUMN `child` INTEGER NOT NULL,
    ADD COLUMN `paymentStatus` BOOLEAN NOT NULL;
