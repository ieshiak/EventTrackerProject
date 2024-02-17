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
  PRIMARY KEY (`id`))
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
  `date` DATETIME NULL,
  `time` TIME NULL,
  `description` VARCHAR(2000) NULL,
  `type` VARCHAR(200) NULL,
  `emotion` VARCHAR(200) NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`id`),
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
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birthday`, `zodiac_sign`, `avatar_URL`, `role`) VALUES (1, 'ieshiak', 'esha', 'Ieshia', 'Parker', 'ieshiak@icloud.com', '1986-07-06', 'cancer', 'esha.png', 'admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `dream`
-- -----------------------------------------------------
START TRANSACTION;
USE `dream`;
INSERT INTO `dream` (`id`, `title`, `date`, `time`, `description`, `type`, `emotion`, `user_id`) VALUES (1, 'Flying Dream', '2024-02-16', '08:00', 'I was flying over a beautiful landscape', 'LucidDream', 'Excitement', 1);
INSERT INTO `dream` (`id`, `title`, `date`, `time`, `description`, `type`, `emotion`, `user_id`) VALUES (2, 'Forest Nightmare', '2024-02-15', '03:00', 'I was being chased by a monster through a dark forest', 'Nightmare', 'Fear', 1);

COMMIT;

