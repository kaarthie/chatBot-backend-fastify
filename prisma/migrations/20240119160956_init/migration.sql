/*
  Warnings:

  - You are about to drop the column `created_at` on the `IndividualChatHistory` table. All the data in the column will be lost.
  - You are about to drop the column `msg` on the `IndividualChatHistory` table. All the data in the column will be lost.
  - Added the required column `message` to the `IndividualChatHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IndividualChatHistory` DROP COLUMN `created_at`,
    DROP COLUMN `msg`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
