-- DropForeignKey
ALTER TABLE `PendingBooking` DROP FOREIGN KEY `PendingBooking_chatId_fkey`;

-- AddForeignKey
ALTER TABLE `PendingBooking` ADD CONSTRAINT `PendingBooking_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatHistoryCollection`(`chatId`) ON DELETE CASCADE ON UPDATE CASCADE;
