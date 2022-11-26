USE company_db;

-- INSERT DEPARTMENTS
INSERT INTO department (department_name)
VALUES ("Executive"),
       ("Administration"),
       ("Operations"),
       ("Sales"),
       ("Human Resources");

-- INSERT ROLES
INSERT INTO role (role_title, role_salary, department_id)
VALUES ("CEO", 750000, 1),
       ("COO", 525000, 1),
       ("Moderator", 245000, 2),
       ("Office Manager", 100000, 2),
       ("Operations Manager", 75000, 3),
       ("Software Engineer", 120000, 3),
       ("Sales Manager", 55000, 4),
       ("Sales Rep", 85000, 4),
       ("Director", 55000, 5),
       ("Recruiter", 45000, 5);

-- INSERT EMPLOYEES
INSERT INTO employee (employee_firstname, employee_lastname, employee_role, manager_id)
VALUES ("Jonah", "Mae", "CEO", 1),
       ("Russel", "Locke", "COO", 2),
       ("Mika", "Loua", "Moderator", 3),
       ("Allie", "Jones", "Office Manager", 4),
       ("Donny", "Rodrick", "Sales Manager", 5),
       ("Agnes", "Stella", "Director", 6),
       ("Michael", "Storm", "Sales Rep", NULL),
       ("Joshua", "Fluke", "Software Engineer", NULL),
       ("Elena", "Martin", "Software Engineer", NULL),
       ("Sam", "Garrett", "Software Engineer", NULL),
       ("Remaru", "Veldt", "Recruiter", NULL),
       ("Peter", "Williams", "Recruiter", NULL);