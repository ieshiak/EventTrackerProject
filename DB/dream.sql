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
SHOW WARNINGS;
USE `dream` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(200) NULL,
  `last_name` VARCHAR(200) NULL,
  `email` VARCHAR(400) NULL,
  `birthday` DATETIME NULL,
  `zodiac_sign` VARCHAR(200) NULL,
  `avatar_URL` VARCHAR(400) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `dream`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dream` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `dream` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NULL,
  `date_time` DATETIME NULL,
  `description` VARCHAR(2000) NULL,
  `type` VARCHAR(200) NULL,
  `emotion` VARCHAR(200) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_dream_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_dream_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
SET SQL_MODE = '';
DROP USER IF EXISTS dreamer@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SHOW WARNINGS;
CREATE USER 'dreamer'@'localhost' IDENTIFIED BY 'dreamer';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'dreamer'@'localhost';
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `zodiac_sign`, `avatar_URL`, `role`) VALUES (1, 'ieshiak', 'esha', 'Ieshia', 'Parker', 'ieshiak@icloud.com', '1986-07-06', 'CANCER', 'images/IMG_STAR1.PNG', 'ADMIN');
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `zodiac_sign`, `avatar_URL`, `role`) VALUES (2, 'testuser', 'testuser', 'Test', 'User', 'testuser@example.com', '1966-02-28', 'PISCES', 'images/IMG_STAR2.PNG', 'USER');
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `zodiac_sign`, `avatar_URL`, `role`) VALUES (3, 'mikeevans', 'mike', 'Michael', 'Evans', 'mikemike@example.com', '1997-08-07', 'LEO', 'images/IMG_STAR3.PNG', 'MODERATOR');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dream`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (1, 'Flying Dream', '2024-02-16 10:30:00', 'I was flying over a beautiful landscape', 'Lucid', 'Excitement', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (2, 'Forest Nightmare', '2024-02-01 08:15:00', 'I was being chased by a monster through a dark forest', 'Nightmare', 'Fear', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (3, 'Beach Dream', '2024-02-10 16:45:00', 'I found myself relaxing on a sunny beach with crystal-clear water', 'Lucid', 'Relaxation', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (4, 'Lost in the City', '2024-02-15 20:00:00', 'I was wandering through a bustling city with towering skyscrapers', 'Normal', 'Amusement', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (5, 'Underwater Adventure', '2024-02-20 23:15:00', 'I explored an underwater world filled with colorful coral reefs and exotic fish', 'Lucid', 'Wonder', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (6, 'Haunted House', '2024-02-25 03:30:00', 'I ventured into a creepy haunted house with creaking floorboards and flickering lights', 'Nightmare', 'Fear', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (7, 'Space Odyssey', '2024-02-02 07:45:00', 'I traveled through space, witnessing breathtaking cosmic phenomena', 'Lucid', 'Amazement', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (8, 'Jungle Trek', '2024-02-06 11:00:00', 'I embarked on an adventure through a dense jungle, encountering wild animals and hidden ruins', 'Normal', 'Excitement', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (9, 'Fairy Tale Kingdom', '2024-02-11 15:15:00', 'I found myself in a magical kingdom filled with fairies, unicorns, and castles', 'Lucid', 'Happiness', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (10, 'Desert Mirage', '2024-02-16 19:30:00', 'I wandered through a vast desert landscape, experiencing mirages and mysterious oases', 'Normal', 'Disorientation', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (11, 'Alien Encounter', '2024-02-21 23:45:00', 'I had a close encounter with extraterrestrial beings in a UFO', 'Lucid', 'Interested', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (12, 'Time Travel Adventure', '2024-02-26 04:00:00', 'I traveled through time, witnessing historical events and meeting famous figures', 'Normal', 'Intrigue', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (13, 'Fairytale Wedding', '2024-02-03 08:15:00', 'I attended a fairytale wedding in a magical castle, surrounded by enchanting creatures', 'Lucid', 'Joy', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (14, 'Underground Cavern', '2024-02-07 12:30:00', 'I explored vast underground caverns filled with shimmering crystals and mysterious creatures', 'Normal', 'Amazement', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (15, 'Haunted Carnival', '2024-02-12 16:45:00', 'I wandered through a spooky carnival with eerie rides and ghostly attractions', 'Nightmare', 'Fear', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (16, 'Fantasy Quest', '2024-02-17 20:00:00', 'I embarked on a quest through a fantasy realm, battling dragons and seeking treasure', 'Lucid', 'Adventure', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (17, 'Magical Forest', '2024-02-22 23:15:00', 'I found myself in a lush, enchanted forest with talking animals and magical plants', 'Normal', 'Wonder', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (18, 'Apocalyptic Vision', '2024-02-27 03:30:00', 'I witnessed the end of the world in a chaotic apocalyptic scenario', 'Nightmare', 'Dread', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (19, 'Underworld Journey', '2024-02-04 07:45:00', 'I journeyed into the underworld, facing trials and challenges in the realm of the dead', 'Lucid', 'Surprise', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `user_id`) VALUES (20, 'Heavenly Paradise', '2024-02-08 11:00:00', 'I ascended to a heavenly paradise, experiencing peace and tranquility', 'Lucid', 'Bliss', 2);

COMMIT;

