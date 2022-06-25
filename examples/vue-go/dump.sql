-- Adminer 4.8.1 MySQL 5.5.5-10.7.3-MariaDB-1:10.7.3+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `example`;
CREATE DATABASE `example` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `example`;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `price` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`id`, `name`, `price`) VALUES
(1,	'Apple 3x', 0.50),
(2,	'Banana 3x', 0.80),
(3,	'Lemon 3x', 0.60),
(4,	'Blueberries 100g', 0.90),
(5,	'Raspberry 100g', 1.00);

-- 2022-06-17 03:30:45
