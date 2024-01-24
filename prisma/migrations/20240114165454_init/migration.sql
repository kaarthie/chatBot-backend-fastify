/*
  Warnings:

  - You are about to drop the column `reply` on the `IndividualChatHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userMSG` on the `IndividualChatHistory` table. All the data in the column will be lost.
  - Added the required column `msg` to the `IndividualChatHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `IndividualChatHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IndividualChatHistory` DROP COLUMN `reply`,
    DROP COLUMN `userMSG`,
    ADD COLUMN `msg` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
