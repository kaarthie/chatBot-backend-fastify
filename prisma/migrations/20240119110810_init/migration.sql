-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;
