-- AlterTable
ALTER TABLE `PendingBooking` ADD COLUMN `count` INTEGER NULL,
    ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `price` VARCHAR(191) NULL;
