DROP DATABASE IF EXISTS employeeDatabase;
CREATE database employeeDatabase;

USE employeeDatabase;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
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
