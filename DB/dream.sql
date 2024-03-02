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
-- Table `zodiac`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zodiac` ;

CREATE TABLE IF NOT EXISTS `zodiac` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `zodiac_sign` VARCHAR(20) NOT NULL,
  `start_date` VARCHAR(5) NOT NULL,
  `end_date` VARCHAR(5) NOT NULL,
  `background_img` VARCHAR(500) NULL,
  `sleep_pattern_info` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `background_img_UNIQUE` (`background_img` ASC),
  UNIQUE INDEX `zodiac_sign_UNIQUE` (`zodiac_sign` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(200) NULL,
  `last_name` VARCHAR(200) NULL,
  `email` VARCHAR(400) NULL,
  `birthday` DATETIME NULL,
  `role` VARCHAR(45) NULL,
  `zodiac_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_user_zodiac1_idx` (`zodiac_id` ASC),
  CONSTRAINT `fk_user_zodiac1`
    FOREIGN KEY (`zodiac_id`)
    REFERENCES `zodiac` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dream`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dream` ;

CREATE TABLE IF NOT EXISTS `dream` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NULL,
  `date_time` DATETIME NULL,
  `description` VARCHAR(2000) NULL,
  `type` VARCHAR(200) NULL,
  `emotion` VARCHAR(200) NULL,
  `img_url` TEXT(500) NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dream_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_dream_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Data for table `zodiac`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (1, 'Aries', '03-21', '04-19', 'aries_background.jpg', 'Individuals born under Aries tend to have a dynamic and energetic sleep pattern. They may find it easy to fall asleep but might also experience restless nights. Aries individuals may have vivid dreams and may occasionally suffer from sleep disturbances due to their active minds.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (2, 'Taurus', '04-20', '05-20', 'taurus_background.jpg', 'People born under Taurus usually have a stable and consistent sleep pattern. They typically enjoy deep and restorative sleep');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (3, 'Gemini', '05-21', '06-20', 'gemini_background.jpg', 'Geminis often have an erratic sleep pattern characterized by frequent awakenings and restless nights. They tend to have busy minds and may struggle to switch off before bedtime. Geminis may benefit from relaxation techniques to improve the quality of their sleep.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (4, 'Cancer', '06-21', '07-22', 'cancer_background.jpg', 'Individuals born under Cancer usually have a nurturing and comforting sleep pattern. They may enjoy a cozy sleep environment and find solace in bedtime routines. Cancer individuals may experience vivid dreams that reflect their emotional depth and sensitivity.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (5, 'Leo', '07-23', '08-22', 'leo_background.jpg', 'Leos often have a confident and assertive sleep pattern. They may have a strong need for sleep and prioritize rest to recharge their energy. Leos may experience vivid and memorable dreams that reflect their creativity and leadership qualities.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (6, 'Virgo', '08-23', '09-22', 'virgo_background.jpg', 'People born under Virgo typically have a structured and disciplined sleep pattern. They may adhere to strict bedtime routines and prioritize quality sleep. Virgos may have detailed and analytical dreams that reflect their practical and meticulous nature.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (7, 'Libra', '09-23', '10-22', 'libra_background.jpg', 'Libras usually have a balanced and harmonious sleep pattern. They may enjoy a peaceful sleep environment and strive for tranquility before bedtime. Libras may have dreams that reflect their desire for harmony and fairness in relationships and life.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (8, 'Scorpio', '10-23', '11-21', 'scorpio_background.jpg', 'Scorpios often have an intense and passionate sleep pattern. They may experience deep and transformative sleep');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (9, 'Sagittarius', '11-22', '12-21', 'sagittarius_background.jpg', 'Individuals born under Sagittarius usually have an adventurous and free-spirited sleep pattern. They may have irregular sleep habits and enjoy exploring new experiences even in their dreams. Sagittarians may have dreams that reflect their optimistic and adventurous nature.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (10, 'Capricorn', '12-22', '01-19', 'capricorn_background.jpg', 'Capricorns typically have a disciplined and goal-oriented sleep pattern. They may prioritize rest and sleep as part of their overall success strategy. Capricorns may have dreams that reflect their ambition');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (11, 'Aquarius', '01-20', '02-18', 'aquarius_background.jpg', 'People born under Aquarius usually have an unconventional and unpredictable sleep pattern. They may have a tendency to stay up late or have sudden bursts of energy during the night. Aquarians may have dreams that reflect their innovative and visionary nature.');
INSERT INTO `zodiac` (`id`, `zodiac_sign`, `start_date`, `end_date`, `background_img`, `sleep_pattern_info`) VALUES (12, 'Pisces', '02-19', '03-20', 'pisces_background.jpg', 'Pisces individuals often have a dreamy and imaginative sleep pattern. They may have vivid dreams and may find it easy to slip into the world of dreams. Pisceans may have dreams that reflect their artistic and intuitive nature.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `role`, `zodiac_id`) VALUES (1, 'ieshiak', 'esha', 'Ieshia', 'Parker', 'ieshiak@icloud.com', '1986-07-06', 'admin', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `role`, `zodiac_id`) VALUES (2, 'testuser', 'testuser', 'Test', 'User', 'testuser@example.com', '1966-02-28', 'user', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `role`, `zodiac_id`) VALUES (3, 'mikeevans', 'mike', 'Michael', 'Evans', 'mikemike@example.com', '1997-08-07', 'user', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `dream`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (1, 'Flying Dream', '2024-02-16 10:30:00', 'I was flying over a beautiful landscape', 'Lucid', 'Excitement', 'img_star13', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (2, 'Forest Nightmare', '2024-02-01 08:15:00', 'I was being chased by a monster through a dark forest', 'Nightmare', 'Fear', 'img_star18', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (3, 'Beach Dream', '2024-02-10 16:45:00', 'I found myself relaxing on a sunny beach with crystal-clear water', 'Lucid', 'Relaxation', 'img_star9', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (4, 'Lost in the City', '2024-02-15 20:00:00', 'I was wandering through a bustling city with towering skyscrapers', 'Normal', 'Amusement', 'img_star16', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (5, 'Underwater Adventure', '2024-02-20 23:15:00', 'I explored an underwater world filled with colorful coral reefs and exotic fish', 'Lucid', 'Wonder', 'img_star14', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (6, 'Haunted House', '2024-02-25 03:30:00', 'I ventured into a creepy haunted house with creaking floorboards and flickering lights', 'Nightmare', 'Fear', 'img_star1', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (7, 'Space Odyssey', '2024-02-02 07:45:00', 'I traveled through space, witnessing breathtaking cosmic phenomena', 'Lucid', 'Amazement', 'img_star19', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (8, 'Jungle Trek', '2024-02-06 11:00:00', 'I embarked on an adventure through a dense jungle, encountering wild animals and hidden ruins', 'Normal', 'Excitement', 'img_star7', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (9, 'Fairy Tale Kingdom', '2024-02-11 15:15:00', 'I found myself in a magical kingdom filled with fairies, unicorns, and castles', 'Lucid', 'Happiness', 'img_star5', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (10, 'Desert Mirage', '2024-02-16 19:30:00', 'I wandered through a vast desert landscape, experiencing mirages and mysterious oases', 'Normal', 'Disorientation', 'img_star21', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (11, 'Alien Encounter', '2024-02-21 23:45:00', 'I had a close encounter with extraterrestrial beings in a UFO', 'Lucid', 'Interested', 'img_star20', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (12, 'Time Travel Adventure', '2024-02-26 04:00:00', 'I traveled through time, witnessing historical events and meeting famous figures', 'Normal', 'Intrigue', 'img_star22', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (13, 'Fairytale Wedding', '2024-02-03 08:15:00', 'I attended a fairytale wedding in a magical castle, surrounded by enchanting creatures', 'Lucid', 'Joy', 'img_star10', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (14, 'Underground Cavern', '2024-02-07 12:30:00', 'I explored vast underground caverns filled with shimmering crystals and mysterious creatures', 'Normal', 'Amazement', 'img_star15', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (15, 'Haunted Carnival', '2024-02-12 16:45:00', 'I wandered through a spooky carnival with eerie rides and ghostly attractions', 'Nightmare', 'Fear', 'img_star3', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (16, 'Fantasy Quest', '2024-02-17 20:00:00', 'I embarked on a quest through a fantasy realm, battling dragons and seeking treasure', 'Lucid', 'Adventure', 'img_star12', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (17, 'Magical Forest', '2024-02-22 23:15:00', 'I found myself in a lush, enchanted forest with talking animals and magical plants', 'Normal', 'Wonder', 'img_star4', 3);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (18, 'Apocalyptic Vision', '2024-02-27 03:30:00', 'I witnessed the end of the world in a chaotic apocalyptic scenario', 'Nightmare', 'Dread', 'img_star17', 2);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (19, 'Underworld Journey', '2024-02-04 07:45:00', 'I journeyed into the underworld, facing trials and challenges in the realm of the dead', 'Lucid', 'Surprise', 'img_star2', 1);
INSERT INTO `dream` (`id`, `title`, `date_time`, `description`, `type`, `emotion`, `img_url`, `user_id`) VALUES (20, 'Heavenly Paradise', '2024-02-08 11:00:00', 'I ascended to a heavenly paradise, experiencing peace and tranquility', 'Lucid', 'Bliss', 'img_star11', 2);

COMMIT;

