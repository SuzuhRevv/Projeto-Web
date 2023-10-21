/*
  Warnings:

  - You are about to drop the column `bread` on the `row` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `row` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Row` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paes` to the `Row` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `row` DROP COLUMN `bread`,
    DROP COLUMN `name`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `paes` INTEGER NOT NULL;
