/*
  Warnings:

  - A unique constraint covering the columns `[user_otp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verification_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_password_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_verification_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_verification_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_verification_token` VARCHAR(191) NULL,
    ADD COLUMN `email_verification_token_expiry` DATETIME(3) NULL,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(255) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL,
    ADD COLUMN `phone_number_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone_verification_token` VARCHAR(191) NULL,
    ADD COLUMN `phone_verification_token_expiry` DATETIME(3) NULL,
    ADD COLUMN `reset_password_token` VARCHAR(191) NULL,
    ADD COLUMN `reset_password_token_expiry` DATETIME(3) NULL,
    ADD COLUMN `user_otp` VARCHAR(191) NULL,
    ADD COLUMN `verification_token` VARCHAR(191) NULL,
    ADD COLUMN `verification_token_expiry` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_user_otp_key` ON `User`(`user_otp`);

-- CreateIndex
CREATE UNIQUE INDEX `User_verification_token_key` ON `User`(`verification_token`);

-- CreateIndex
CREATE UNIQUE INDEX `User_reset_password_token_key` ON `User`(`reset_password_token`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_verification_token_key` ON `User`(`email_verification_token`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_number_key` ON `User`(`phone_number`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_verification_token_key` ON `User`(`phone_verification_token`);
