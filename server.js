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
		type: 'list',
		message: "What would you like to do?",
        choices: [ "View All Employees",
                    "View All Departments",
                    "View All Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Update Employee Role",
                    "Exit"
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
		} else if (answer.toDo === "Exit") {
			// End connection to exit
			connection.end();
		}
	});
}

function viewEmployees() {
	connection.query('SELECT * FROM employee', (err, employees) => {
		if(err) throw err;
		console.table(employees);
  })
  start();
}

