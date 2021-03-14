DROP DATABASE IF EXISTS employeeDatabase;
CREATE database employeeDatabase;

USE employeeDatabase;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE set null
);

INSERT INTO department (name)
VALUES ("Sales", "Engineering", "Finance", "Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead")
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson")
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer")
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer")
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant")
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead")
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer")

INSERT INTO employee (first_name, last_name, role_id, manager_id)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
