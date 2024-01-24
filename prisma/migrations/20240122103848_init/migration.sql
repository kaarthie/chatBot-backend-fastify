-- CreateTable
CREATE TABLE `PendingBooking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomTypes` VARCHAR(191) NULL,
    `roomAmenities` VARCHAR(191) NULL,
    `hotelAmenities` VARCHAR(191) NULL,
    `adults` INTEGER NULL,
    `children` INTEGER NULL,
    `location` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `chatId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PendingBooking` ADD CONSTRAINT `PendingBooking_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatHistoryCollection`(`chatId`) ON DELETE SET NULL ON UPDATE CASCADE;
