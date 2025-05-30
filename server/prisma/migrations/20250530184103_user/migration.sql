/*
  Warnings:

  - You are about to drop the column `customer_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[custom_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_customer_id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `customer_id`,
    ADD COLUMN `custom_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_custom_id_key` ON `User`(`custom_id`);
