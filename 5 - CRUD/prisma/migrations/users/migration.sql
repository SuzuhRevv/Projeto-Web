-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Idade` INTEGER NOT NULL,
    `Cidade` VARCHAR(191) NOT NULL,
    `Estado` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_Email_key`(`Email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
