-- DropForeignKey
ALTER TABLE `IndividualChatHistory` DROP FOREIGN KEY `IndividualChatHistory_chatId_fkey`;

-- AddForeignKey
ALTER TABLE `IndividualChatHistory` ADD CONSTRAINT `IndividualChatHistory_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatHistoryCollection`(`chatId`) ON DELETE CASCADE ON UPDATE CASCADE;
