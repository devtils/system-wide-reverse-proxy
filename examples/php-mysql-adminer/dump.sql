-- Adminer 4.8.1 MySQL 5.5.5-10.7.3-MariaDB-1:10.7.3+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `example`;
CREATE DATABASE `example` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `example`;

DROP TABLE IF EXISTS `fruits`;
CREATE TABLE `fruits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `fruits` (`id`, `title`) VALUES
(1,	'Apple'),
(2,	'Banana'),
(4,	'Blueberry'),
(3,	'Citrus'),
(5,	'Raspberry');

-- 2022-06-17 03:30:45
