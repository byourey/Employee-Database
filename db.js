class DB {
    findAllemployees() {
        return("SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, CONCAT(manager.first_name ,' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN employee manager ON manager.id=employee.manager_id");
    }
}
module.exports = new DB;


