DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- TABLE FOR EMPLOYEES
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_firstname` varchar(30) NOT NULL,
  `employee_lastname` varchar(30) NOT NULL,
  `employee_role` varchar(30) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
PRIMARY KEY (`employee_id`));

-- TABLE FOR EMPLOYEE ROLES
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_title` varchar(30) NOT NULL,
  `role_salary` decimal NOT NULL,
  `department_id` varchar(30) NOT NULL,
PRIMARY KEY (`role_id`));

-- TABLE FOR DEPARTMENTS
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(30) NOT NULL,
PRIMARY KEY (`department_id`));







