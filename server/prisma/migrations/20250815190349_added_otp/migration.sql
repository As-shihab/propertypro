/*
  Warnings:

  - Added the required column `tokenType` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `tokenType` VARCHAR(191) NOT NULL;
