/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `PendingBooking` will be added. If there are existing duplicate values, this will fail.
  - Made the column `chatId` on table `PendingBooking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PendingBooking` DROP FOREIGN KEY `PendingBooking_chatId_fkey`;

-- AlterTable
ALTER TABLE `PendingBooking` MODIFY `chatId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PendingBooking_chatId_key` ON `PendingBooking`(`chatId`);

-- AddForeignKey
ALTER TABLE `PendingBooking` ADD CONSTRAINT `PendingBooking_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatHistoryCollection`(`chatId`) ON DELETE RESTRICT ON UPDATE CASCADE;
