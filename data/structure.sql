SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `stuff` (
  `id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `stuff`
  ADD KEY `id` (`id`);


ALTER TABLE `stuff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
