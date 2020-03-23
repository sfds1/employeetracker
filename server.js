const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// need to set up this variable whbich gives back an object
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
	if(err) throw err;
	start();
});

function start() {
	inquirer.prompt({
		name: 'toDo',
		type: 'rawlist',
		message: "What would you like to do?",
        choices: [ "View All Employees",
        "Exit",
                    "View All Departments",
                    "View All Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Update Employee Role"

                    // "View All Employees By Department",
                    // "View All Employee By Manager",
                    // "Remove Employee",
                    // "Update Employee Manager",
                    // "Remove Role"
                 ]
	}).then(answer => {
		if(answer.toDo === "View All Employees") {
			// View Employee table
			viewEmployees();
    } else if (answer.toDo === "View All Departments") {
			// View Department table
			viewDepartments();
    } else if (answer.toDo === "View All Roles") {
			// View Role table
			viewRoles();
    }
    
    else if (answer.toDo === "Exit") {
			// End connection to exit
			connection.end();
    }
  });

}

// Show Employee Table
function viewEmployees() {
	connection.query('SELECT * FROM employee', (err, employees) => {
		if(err) throw err;
    console.table(`Employee Listing:`, employees);
    // Once the employee table is listed, then call start again to choose another option
    start();
  })
}

// Show Department Table
function viewDepartments() {
	connection.query('SELECT * FROM department', (err, department) => {
		if(err) throw err;
    console.table(`Department Listing:`, department);
    // Once the department table is listed, then call start again to choose another option
    start();
  })
}

// Show Role Table
function viewRoles() {
	connection.query('SELECT * FROM role', (err, role) => {
		if(err) throw err;
    console.table(`Role Listing:`, role);
    // Once the role table is listed, then call start again to choose another option
    start();
  })
}