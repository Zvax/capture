SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `capture` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `capture`;

CREATE TABLE IF NOT EXISTS `stuff` (
  `id` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `stuff`
  ADD UNIQUE KEY `id` (`id`) USING BTREE,
  ADD KEY `status` (`status`),
  ADD KEY `parentId` (`parentId`);


ALTER TABLE `stuff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `stuff`
  ADD CONSTRAINT `parentOfStuff` FOREIGN KEY (`parentId`) REFERENCES `stuff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
