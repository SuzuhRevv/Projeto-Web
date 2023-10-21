/*
  Warnings:

  - You are about to drop the column `nome` on the `row` table. All the data in the column will be lost.
  - You are about to drop the column `paes` on the `row` table. All the data in the column will be lost.
  - Added the required column `bread` to the `Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `row` DROP COLUMN `nome`,
    DROP COLUMN `paes`,
    ADD COLUMN `bread` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
