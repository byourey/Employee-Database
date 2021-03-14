const inquirer = require('inquirer');
const mysql = require('mysql');
const consTable = require("console.table");

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
        switch (answers.task) {
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
                connection.end();
                break;
            default:
                console.log(`Invalid action: ${answers.task}`);
            break;
        }


    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            message: "Department name?"
         }
    ])
    .then((answers) => {
        connection.query('INSERT INTO department SET', 
        {
            name: answers.departmentName
        },
        (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Department created");
            }
        }
        
        );

        questionsPrompt()
        }).catch(err => console.log(err));
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What role would you like to add?"
        }, {
            type: "input",
            name: "salary",
            message: "What is the salary?"
        },
        {
            type: "input",
            name: "newRoleDepartment",
            message: "Which department does the role belong to?",
            choices: [
                'Engineering',
                'Finance',
                'Legal',
                'Sales'
            ]
        }
    ])
    .then((answers) => {
        console.log(answers.newRole);
        console.log(answers.salary);
        console.log(answers.newRoleDepartment);

        questionsPrompt()
    }).catch(err => console.log(err));
}

function addEmployee() {
    inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee first name?"
        }, {
            type: "input",
            name: "lastName",
            message: "What is the employee last name?"
        }, {
            type: "list",
            name: "role",
            message: "What is the role of the employee?",
            choices: [
                'Lead Engineer',
                'Software Engineer',
                'Accountant Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
            ]
        }, {
            type: "input",
            name: "managername",
            message: "What is the name of the employee manager?",
            choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupic',
                    'Kunal Singh',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
            ]
        }

    ])
    .then((answers) => {
        console.log(answers.firstName);
        console.log(answers.lastName);
        console.log(answers.role);
        console.log(answers.manager);

        questionsPrompt()
    }).catch(err => console.log(err));

    }

    function addViewEmployees() {
        const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, CONCAT(manager.first_name ,' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN employee manager ON manager.id=employee.manager_id";

        connection.query(query, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log('\n');
                console.table(results);
                console.log('\n');
                questionsPrompt()
            }
            })
    }

    function addViewDepartment() {
        inquirer.prompt([
            {
                type: "list",
                name: "viewDepartment",
                message: "What department you would like to see?",
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
        
            }
        ]).then((answers) => {
            console.log(answers.viewDepartment);
            questionsPrompt()
        }).catch(err => console.log(err));
            
        }
    

    function addViewEmployeesByManager() {
        inquirer.prompt([
            {
                type: "list",
                name: "ViewEmployeesByManager",
                message: "Which employee manager would you like to search for?",
                choices: [
                    'Ashley Rodriguez',
                    'John Doe',
                    'Sara Lourd',
                ]
            }
        ]).then((answers) => {
            console.log(answers.addViewEmployeesByManager);
            questionsPrompt()
        }).catch(err => console.log(err));
    }

    function addUpdateEmployeeRoles() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeRole",
                message: "Choose an employee to update",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupik',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal'
                ]
            },
            {
                type: "list",
                name: "employeeRole1",
                message: "Select a role to assign the employee to?",
                choices: [
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Software Engineer',
                    'Accountant Manager',
                    'Accountant',
                    'Legal Team Lead',
                    'Lawyer'
                ]
            },

        ]).then((answers) => {
            console.log(answers.employeeRole);
            console.log(answers.employeeRole1);
            
            questionsPrompt()
        }).catch(err => console.log(err));
    }

    function addUpdateEmployeeManagers() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeManager",
                message: "Which employee manager you want to update?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupik',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal'
                ]
            },
            {
                type: "list",
                name: "employeeManager1",
                message:  "Which manager you want to update it to?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupik',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal'
                ]
            }
        ]).then((answers) => {
            console.log(answers.employeeManager);
            console.log(answers.employeeManager1);
            
            questionsPrompt()
        }).catch(err => console.log(err));
    }

    function addDeleteEmployee() {
        inquirer.prompt([
            {
                type: "list",
                name: "deleteEmployee",
                message: "Which employee you want to remove?",
                choices: [
                    'John Doe',
                'Mike Chan',
                'Ashley Rodriguez',
                'Kevin Tupik',
                'Malia Brown',
                'Sarah Lourd',
                'Tom Allen',
                'Tammer Galal'
                ]
            }
        ]).then((answers) => {
            console.log(answers.addDeleteEmployee);
    
            questionsPrompt()
        }).catch(err => console.log(err));
    }

    function addViewRoles() {
        connection.query('SELECT * FROM role', (err, result) => {
            if(err) {
                console.log(err)
            } else {
                console.log('\n');
                console.log(result);
                console.log('\n');
                questionsPrompt()
            }
        }   
        );   
     }
    
    function addDeleteRoles() {
        inquirer.prompt([
            {
                type: "list",
                name: "deleteRole",
                message: "Which role you want to delete?",
                choices: [
                    'Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Accountant Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
                ]
            }
        ]).then((answers) => {
            console.log(answers.deleteRole);

            questionsPrompt
        }).catch(err => console.log(err));
    }

    function addDeleteDepartments() {
        inquirer.prompt([
            {
                type: "list",
                name: "deleteDepartment",
                message: "Which deparment you want to remove?",
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((answers) => {
            console.log(answers.deleteDepartment);

            questionsPrompt()
        }).catch(err => console.log(err));
    }
