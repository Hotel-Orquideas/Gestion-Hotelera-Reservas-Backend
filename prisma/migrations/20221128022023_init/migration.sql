-- CreateTable
CREATE TABLE `Hotels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nit` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `city` VARCHAR(30) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Hotels_nit_key`(`nit`),
    UNIQUE INDEX `Hotels_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `type_document` ENUM('CC', 'PA', 'TI', 'CE') NOT NULL DEFAULT 'CC',
    `document` VARCHAR(100) NOT NULL,
    `genre` ENUM('M', 'F', 'O') NULL,
    `birthdate` DATE NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NULL,
    `blood_type` VARCHAR(4) NULL,

    UNIQUE INDEX `Persons_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(50) NOT NULL,
    `state` ENUM('A', 'B', 'D', 'I') NOT NULL DEFAULT 'B',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `person_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `employee_id` INTEGER NOT NULL,

    UNIQUE INDEX `Credentials_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_issuance_doc` DATETIME(3) NULL,
    `country_origin` VARCHAR(50) NULL,
    `country_destination` VARCHAR(50) NULL,
    `city_origin` VARCHAR(50) NULL,
    `city_destination` VARCHAR(50) NULL,
    `profession` VARCHAR(50) NULL,
    `state` ENUM('A', 'B', 'D', 'I') NOT NULL DEFAULT 'A',
    `person_id` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `nit` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(30) NOT NULL,
    `legal_agent` VARCHAR(50) NOT NULL,
    `state` ENUM('A', 'B', 'D', 'I') NOT NULL DEFAULT 'A',

    UNIQUE INDEX `Companies_nit_key`(`nit`),
    UNIQUE INDEX `Companies_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients_companies` (
    `client_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,

    PRIMARY KEY (`client_id`, `company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `percentage` FLOAT NOT NULL,
    `expiration_date` DATE NOT NULL,
    `company_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_methods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `total` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) NOT NULL,
    `date` DATETIME NOT NULL,
    `value` INTEGER NOT NULL,
    `bill_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value_to_pay` INTEGER NOT NULL,
    `date_of_pay` DATE NOT NULL,
    `balance_due` INTEGER NOT NULL,
    `bill_id` INTEGER NOT NULL,
    `payment_method_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `num_max_guests` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `value` INTEGER NOT NULL,
    `room_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(10) NOT NULL,
    `state` ENUM('A', 'M', 'O') NOT NULL DEFAULT 'A',
    `room_type_id` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price_per_unit` INTEGER NOT NULL,
    `hotel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `booking_room_booking_id` INTEGER NOT NULL,
    `booking_room_room_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `check_in_date` DATETIME(0) NOT NULL,
    `check_out_date` DATETIME(0) NOT NULL,
    `details` VARCHAR(255) NOT NULL,
    `hotel_id` INTEGER NOT NULL,
    `company_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking_rooms` (
    `booking_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `discount` INTEGER NULL,

    PRIMARY KEY (`booking_id`, `room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking_rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bill_id` INTEGER NOT NULL,
    `booking_room_booking_id` INTEGER NOT NULL,
    `booking_room_room_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking_clients` (
    `client_id` INTEGER NOT NULL,
    `booking_id` INTEGER NOT NULL,

    PRIMARY KEY (`client_id`, `booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients_companies` ADD CONSTRAINT `Clients_companies_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clients_companies` ADD CONSTRAINT `Clients_companies_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotions` ADD CONSTRAINT `Promotions_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bills` ADD CONSTRAINT `Bills_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bills` ADD CONSTRAINT `Bills_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill_details` ADD CONSTRAINT `Bill_details_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments_history` ADD CONSTRAINT `Payments_history_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments_history` ADD CONSTRAINT `Payments_history_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `Payment_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `Room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `Room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room_services` ADD CONSTRAINT `Room_services_booking_room_booking_id_booking_room_room_id_fkey` FOREIGN KEY (`booking_room_booking_id`, `booking_room_room_id`) REFERENCES `Booking_rooms`(`booking_id`, `room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room_services` ADD CONSTRAINT `Room_services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_rooms` ADD CONSTRAINT `Booking_rooms_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_rooms` ADD CONSTRAINT `Booking_rooms_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_rates` ADD CONSTRAINT `Booking_rates_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_rates` ADD CONSTRAINT `Booking_rates_booking_room_booking_id_booking_room_room_id_fkey` FOREIGN KEY (`booking_room_booking_id`, `booking_room_room_id`) REFERENCES `Booking_rooms`(`booking_id`, `room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_clients` ADD CONSTRAINT `Booking_clients_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_clients` ADD CONSTRAINT `Booking_clients_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
