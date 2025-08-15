/*
  Warnings:

  - You are about to drop the column `tokenType` on the `tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `tokens_token_key` ON `tokens`;

-- AlterTable
ALTER TABLE `tokens` DROP COLUMN `tokenType`;
