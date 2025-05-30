/*
  Warnings:

  - You are about to drop the column `timestamp` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `timestamp`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `customer_id` VARCHAR(191) NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `login_token` VARCHAR(191) NULL,
    ADD COLUMN `login_token_expiry` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_customer_id_key` ON `User`(`customer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_login_token_key` ON `User`(`login_token`);
