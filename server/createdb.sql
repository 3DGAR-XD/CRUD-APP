CREATE DATABASE crud;
CREATE TABLE `crud`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `crud`.`peliculas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `duration` BIGINT NULL COMMENT 'on minutes',
  `rating` FLOAT NULL,
  `year` INT NULL,
  PRIMARY KEY (`id`)
);
