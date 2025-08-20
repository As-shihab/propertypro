-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_productId_fkey`;

-- DropIndex
DROP INDEX `medias_productId_fkey` ON `medias`;

-- AlterTable
ALTER TABLE `medias` MODIFY `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
