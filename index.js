const inquirer = require('inquirer');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "asdf00asdf",
    database: "employeeDatabase"
});

// SQL connection

connection.connect((err) => {
    if(err) throw err;
    questionsPrompt(); 
});

// Questions which allows users to choose what they want to do

function questionsPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Department",
                "View Roles",
                "View Employees",
                "Update Employee Roles",
                "Update Employee Managers",
                "View Employees by Manager",
                "Delete departments",
                "Delete Roles",
                "Delete Employee",
                "Exit"
            ]
        }
    ])
    .then((answers) => {
        switch (answers) {
            case "Add Department":
                addDepartment();
                break;
            
            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "View Department":
                addViewDepartment();
                break;

            case "View Roles":
                addViewRoles();
                break;

            case "View Employees":
                addViewEmployees();
                break;

            case "Update Employee Roles":
                addUpdateEmployeeRoles();
                break;

            
            case "Update Employee Managers":
                addUpdateEmployeeManagers();
                break;

            case "View Employees by Manager":
                addViewEmployeesByManager();
                break;

            case "Delete departments":
                addDeleteDepartments();
                break;

            case "Delete Roles":
                addDeleteRoles();
                break;

            case "Delete Employee":
                addDeleteEmployee();
                break;

            case "Exit":
                connection.exit();
                break;
        }


    })
}


