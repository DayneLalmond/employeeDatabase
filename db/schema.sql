DROP DATABASE IF EXISTS module12_db;
CREATE DATABASE module12_db;

USE module12_db;

-- Creating tables for department, role, and employee
CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id VARCHAR(30),
manager_id INT,
PRIMARY KEY (id)
);

--

-- Adding all of the data to insert into each table
INSERT INTO department(name)
VALUES 
("HR"), 
("Tech"), 
("Admin"), 
("Management");

INSERT INTO role(title, salary, department_id)
VALUES ("Director", 100000, 1), 
("Office Manager", 75000, 2), 
("Web Developer", 80000, 3), 
("Recruitment", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Gia", "Galindo", "Director", null), 
("Sinead", "Muir", "Office Manager", 1), 
("Mustafa", "Macgregor", "Web Developer", 2),
("Hugo", "Maddox", "Recruitment", 2);
