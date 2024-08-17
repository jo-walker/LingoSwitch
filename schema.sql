-- Create the database
CREATE DATABASE IF NOT EXISTS lingo_switch;

-- Select the database
USE lingo_switch;


-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(5) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  languages JSON NOT NULL,
  history JSON NULL
);

-- Create Strings table
CREATE TABLE IF NOT EXISTS strings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  urlId VARCHAR(4),
  eng_us TEXT,
  fr TEXT,
  de TEXT,
  userId INT,
  projectId VARCHAR(5),
  history JSON NULL,
  active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

-- Create URLs table
CREATE TABLE IF NOT EXISTS urls (
  id VARCHAR(4) PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  history JSON NULL,
  projectId VARCHAR(5),
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  history JSON NULL
);

CREATE TABLE projectusers (
    projectId VARCHAR(5) NOT NULL,
    userId INT NOT NULL,
    history JSON,
    PRIMARY KEY (projectId, userId),
    FOREIGN KEY (projectId) REFERENCES projects(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
-- Create ProjectUsers table to associate projects and users (reference table many to many for projects and users)
CREATE TABLE IF NOT EXISTS projectusers (
  projectId VARCHAR(5) NOT NULL,
  userId INT NOT NULL,
  history JSON NULL,
  PRIMARY KEY (projectId, userId),
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
