-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_access_token_key`(`access_token`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotelCollection` (
    `hotelId` VARCHAR(191) NOT NULL,
    `branchName` VARCHAR(191) NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HotelCollection_branchName_key`(`branchName`),
    PRIMARY KEY (`hotelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenity` (
    `amenityId` VARCHAR(191) NOT NULL,
    `amenity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`amenityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotelAmenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` VARCHAR(191) NOT NULL,
    `amenityId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomAmenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` VARCHAR(191) NOT NULL,
    `amenityId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvailableRooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `locationId` VARCHAR(191) NOT NULL,
    `location_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `roomId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `adult` INTEGER NOT NULL,
    `child` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `bed_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingHistory` (
    `bookingId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `hotelId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NOT NULL,
    `checkOut` DATETIME(3) NOT NULL,

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatHistoryCollection` (
    `chatId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`chatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndividualChatHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chatId` VARCHAR(191) NOT NULL,
    `userMSG` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reply` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HotelCollection` ADD CONSTRAINT `HotelCollection_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`locationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelAmenities` ADD CONSTRAINT `HotelAmenities_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `HotelCollection`(`hotelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelAmenities` ADD CONSTRAINT `HotelAmenities_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `Amenity`(`amenityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomAmenities` ADD CONSTRAINT `RoomAmenities_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomAmenities` ADD CONSTRAINT `RoomAmenities_amenityId_fkey` FOREIGN KEY (`amenityId`) REFERENCES `Amenity`(`amenityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvailableRooms` ADD CONSTRAINT `AvailableRooms_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `HotelCollection`(`hotelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvailableRooms` ADD CONSTRAINT `AvailableRooms_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `HotelCollection`(`hotelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatHistoryCollection` ADD CONSTRAINT `ChatHistoryCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndividualChatHistory` ADD CONSTRAINT `IndividualChatHistory_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `ChatHistoryCollection`(`chatId`) ON DELETE RESTRICT ON UPDATE CASCADE;
