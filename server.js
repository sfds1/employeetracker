
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Allows us to connect to DB
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  // always will be root if on the local machine
  user: "root",

  // Your password
  password: "password",
  // name of the DB want to connect to
  database: "employee_trackerDB"
});

//   need this to start the connection to the server
connection.connect((err) => {
  if (err) throw err;
  start();
});


function start() {
  inquirer.prompt({
    name: 'toDo',
    type: 'list',
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee Role",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Remove Employee",
      // "Update Employee Manager",
      // "Remove Role",
      "Exit"
    ]
  }).then(answer => {
    if (answer.toDo === "View All Employees") {
      // View Employee table
      viewEmployees();
    } else if (answer.toDo === "View All Departments") {
      // View Department table
      viewDepartments();
    } else if (answer.toDo === "View All Roles") {
      // View Role table
      viewRoles();
    } else if (answer.toDo === "Add Employee") {
      // Add employee
      addEmployee();
    } else if (answer.toDo === "Add Department") {
      // Add department
      addDepartment();
    } else if (answer.toDo === "Add Role") {
      // Add role
      addRole();
    } else if (answer.toDo === "Update Employee Role") {
      // Update Employee role
      updateRole();
    } else if (answer.toDo === "View All Employees By Department") {
      // Update Employee role
      viewEmpByDept();
    } else if (answer.toDo === "View All Employees By Manager") {
      // Update Employee role
      viewEmpByMgr();
    } else if (answer.toDo === "Remove Employee") {
      // Update Employee role
      removeEmployee();
    }
    else if (answer.toDo === "Exit") {
      // End connection to exit
      connection.end();
    }
  });

}


// Show Employee Table
function viewEmployees() {
  connection.query('SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, employees) => {
    if (err) throw err;
    console.table(`Employee Listing:`, employees);
    // Once the employee table is listed, then call start again to choose another option
    start();
  })
}


// Show Department Table
function viewDepartments() {
  connection.query('SELECT name AS Department FROM department', (err, department) => {
    if (err) throw err;
    console.table(`Department Listing:`, department);
    // Once the department table is listed, then call start again to choose another option
    start();
  })
}

// Show Role Table
function viewRoles() {
  connection.query('SELECT role.title AS "Role Title", role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id', (err, role) => {
    if (err) throw err;
    console.table(`Role Listing:`, role);
    // Once the role table is listed, then call start again to choose another option
    start();
  })
}


// Add Employee
// Need to get the role and manager list before can start inquirer
function addEmployee() {

  // connection to get the role titles from the role table
  connection.query('SELECT * FROM role', (err, roles) => {
    // console.log(roles)
    if (err) throw err;
    const roleTable = roles.map((role) => ({ name: role.title, value: role.id }));
    // console.log(roleTable)

    // connection to get the employee names as a selection list for the manager
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;

      let employeeTable = employees.map((employee) => ({ name: employee.first_name + ` ` + employee.last_name, value: employee.id }));

      employeeTable.push({ name: 'No Manager', value: null })
      // console.log(employeeTable)

      inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the first name of the employee?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the last name of the employee?"
        },
        {
          name: "role",
          type: "list",
          choices: roleTable,
          message: "What is the employee's role?"

        },
        {
          name: "manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: employeeTable
        }

      ]).then(answer => {
        // console.log(answer)
        connection.query("INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role,
            manager_id: answer.manager

          }, (err) => {
            if (err) throw err;
            console.log("Successfully entered your employee");
            viewEmployees();
          });
      })
    })
  })
}

// Add New Department
function addDepartment() {
  inquirer.prompt([
    {
      name: "newDept",
      type: "input",
      message: "What is the department you want to add?"
    }
  ]).then(answer => {

    connection.query("INSERT INTO department SET ?",
      {
        name: answer.newDept

      }, (err) => {
        if (err) throw err;
        console.log("Successfully entered department");
        viewDepartments();
      });
  })

}

// Add New Role
function addRole() {

  connection.query('SELECT * FROM department', (err, newDept) => {
    if (err) throw err;

    // built in to inquirer  name:.....value: pair to show name and store value
    const deptTable = newDept.map(({ id, name }) => ({ name: name, value: id }));
    // console.log(deptTable);

    inquirer.prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is the role you want to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
      },
      {
        name: "dept",
        type: "list",
        choices: deptTable,
        message: "What is the role's department?"

      }

    ]).then(answer => {

      connection.query("INSERT INTO role SET ?",
        {
          title: answer.newRole,
          salary: answer.salary,
          department_id: answer.dept
        }, (err) => {
          if (err) throw err;
          console.log("Successfully entered role");
          viewRoles();
        });
    });
  });
}

// Update Employee Role
function updateRole() {

  // connection to get the role titles from the role table
  connection.query('SELECT * FROM role', (err, roles) => {
    // console.log(roles)
    if (err) throw err;
    const roleTable = roles.map((role) => ({ name: role.title, value: role.id }));
    // console.log(roleTable)

    // connection to get the employee names as a selection list
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;

      let employeeTable = employees.map((employee) => ({ name: employee.first_name + ` ` + employee.last_name, value: employee.id }));

      // console.log(employeeTable)

      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee do you want to update?",
          choices: employeeTable
        },
        {
          name: "role",
          type: "list",
          choices: roleTable,
          message: "What is the new role?"

        }

      ]).then(answer => {
        // console.log(answer)
        connection.query("UPDATE employee SET ? WHERE ?",
          [{
            role_id: answer.role,

          },
          {
            id: answer.employee
          }],
          (err) => {
            if (err) throw err;
            console.log("Successfully updated the employee");
            viewEmployees();
          });
      })
    })
  })
}

// View All Employees By Department
function viewEmpByDept (){
  connection.query('SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY department.id', (err, employees) => {
    if (err) throw err;
    console.table(`Employee Listing:`, employees);
    // Once the employee table is listed, then call start again to choose another option
    start();
  })
}


// View All Employees By Manager
function viewEmpByMgr (){
  connection.query('SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY employee.manager_id', (err, employees) => {
    if (err) throw err;
    console.table(`Employee Listing:`, employees);
    // Once the employee table is listed, then call start again to choose another option
    start();
  })
}

// Delete Employee 
function removeEmployee() {

  // connection to get the employee names as a selection list
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;

    let employeeTable = employees.map((employee) => ({ name: employee.first_name + ` ` + employee.last_name, value: employee.id }));

    // console.log(employeeTable)

    inquirer.prompt([
      {
        name: "employee",
        type: "list",
        message: "Which employee do you want to remove?",
        choices: employeeTable
      }

    ]).then(answer => {
      // console.log(answer)
      connection.query("DELETE FROM employee WHERE ?",
        {
          id: answer.employee
        },
        (err) => {
          if (err) throw err;
          console.log("Successfully deleted the employee");
          viewEmployees();
        });
    })
  })

}