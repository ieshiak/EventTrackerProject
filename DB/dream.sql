-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dream
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dream` ;

-- -----------------------------------------------------
-- Schema dream
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dream` ;
USE `dream` ;

-- -----------------------------------------------------
-- Table `dream`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dream` ;

CREATE TABLE IF NOT EXISTS `dream` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dreamer` VARCHAR(45) NOT NULL,
  `title` VARCHAR(200) NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `description` VARCHAR(2000) NULL,
  `type` VARCHAR(200) NULL,
  `emotion` VARCHAR(200) NULL,
  `img_url` TEXT(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS dreamer@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'dreamer'@'localhost' IDENTIFIED BY 'dreamer';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'dreamer'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `dream`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (1, 'unknown', 'Flying Dream', '2024-02-16', '10:30:00', 'I was flying over a beautiful landscape', 'Lucid', 'Excitement', 'img_star13');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (2, 'Esha', 'Forest Nightmare', '2024-02-01', '08:15:00', 'I was being chased by a monster through a dark forest', 'Nightmare', 'Fear', 'img_star18');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (3, 'Mike', 'Beach Dream', '2024-02-10', '20:01:00', 'I found myself relaxing on a sunny beach with crystal-clear water', 'Lucid', 'Relaxation', 'img_star9');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (4, 'Misty', 'Lost in the City', '2024-02-15', '20:00:00', 'I was wandering through a bustling city with towering skyscrapers', 'Normal', 'Amusement', 'img_star16');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (5, 'Esha', 'Underwater Adventure', '2024-02-20', '23:15:00', 'I explored an underwater world filled with colorful coral reefs and exotic fish', 'Lucid', 'Wonder', 'img_star14');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (6, 'Braylon', 'Haunted House', '2024-02-25', '02:16:00', 'I ventured into a creepy haunted house with creaking floorboards and flickering lights', 'Nightmare', 'Fear', 'img_star1');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (7, 'John', 'Space Odyssey', '2024-02-02', '03:30:00', 'I traveled through space, witnessing breathtaking cosmic phenomena', 'Lucid', 'Amazement', 'img_star19');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (8, 'Braylon', 'Jungle Trek', '2024-02-06', '07:45:00', 'I embarked on an adventure through a dense jungle, encountering wild animals and hidden ruins', 'Normal', 'Excitement', 'img_star7');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (9, 'Esha', 'Fairy Tale Kingdom', '2024-02-11', '11:00:00', 'I found myself in a magical kingdom filled with fairies, unicorns, and castles', 'Lucid', 'Happiness', 'img_star5');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (10, 'unknown', 'Desert Mirage', '2024-02-16', '11:20:00', 'I wandered through a vast desert landscape, experiencing mirages and mysterious oases', 'Normal', 'Disorientation', 'img_star21');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (11, 'unknown', 'Alien Encounter', '2024-02-21', '19:30:00', 'I had a close encounter with extraterrestrial beings in a UFO', 'Lucid', 'Interested', 'img_star20');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (12, 'Trey', 'Time Travel Adventure', '2024-02-26', '23:45:00', 'I traveled through time, witnessing historical events and meeting famous figures', 'Normal', 'Intrigue', 'img_star22');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (13, 'Esha', 'Fairytale Wedding', '2024-02-03', '03:30:00', 'I attended a fairytale wedding in a magical castle, surrounded by enchanting creatures', 'Lucid', 'Joy', 'img_star10');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (14, 'Braylon', 'Underground Cavern', '2024-02-07', '04:35:00', 'I explored vast underground caverns filled with shimmering crystals and mysterious creatures', 'Normal', 'Amazement', 'img_star15');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (15, 'Lisa', 'Haunted Carnival', '2024-02-12', '23:15:00', 'I wandered through a spooky carnival with eerie rides and ghostly attractions', 'Nightmare', 'Fear', 'img_star3');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (16, 'Lisa', 'Fantasy Quest', '2024-02-17', '07:45:00', 'I embarked on a quest through a fantasy realm, battling dragons and seeking treasure', 'Lucid', 'Adventure', 'img_star12');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (17, 'Joe', 'Magical Forest', '2024-02-22', '16:45:00', 'I found myself in a lush, enchanted forest with talking animals and magical plants', 'Normal', 'Wonder', 'img_star4');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (18, 'unknown', 'Apocalyptic Vision', '2024-02-27', '12:30:00', 'I witnessed the end of the world in a chaotic apocalyptic scenario', 'Nightmare', 'Dread', 'img_star17');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (19, 'Esha', 'Underworld Journey', '2024-02-04', '20:00:00', 'I journeyed into the underworld, facing trials and challenges in the realm of the dead', 'Lucid', 'Surprise', 'img_star2');
INSERT INTO `dream` (`id`, `dreamer`, `title`, `date`, `time`, `description`, `type`, `emotion`, `img_url`) VALUES (20, 'Ziya', 'Heavenly Paradise', '2024-02-08', '04:00:00', 'I ascended to a heavenly paradise, experiencing peace and tranquility', 'Lucid', 'Bliss', 'img_star11');

COMMIT;

