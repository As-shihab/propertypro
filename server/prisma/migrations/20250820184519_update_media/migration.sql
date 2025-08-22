/*
  Warnings:

  - Made the column `productId` on table `medias` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_productId_fkey`;

-- DropIndex
DROP INDEX `medias_productId_fkey` ON `medias`;

-- AlterTable
ALTER TABLE `medias` MODIFY `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
