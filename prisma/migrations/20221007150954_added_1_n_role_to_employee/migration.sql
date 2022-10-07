/*
  Warnings:

  - You are about to alter the column `check_in_date` on the `Bookings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `check_out_date` on the `Bookings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Bookings` MODIFY `check_in_date` DATETIME NOT NULL,
    MODIFY `check_out_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `state` ENUM('A', 'B', 'D') NOT NULL DEFAULT 'A';
