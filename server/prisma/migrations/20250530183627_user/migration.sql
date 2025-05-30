-- AlterTable
ALTER TABLE `user` ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `idx_user_email` ON `User`(`email`);
