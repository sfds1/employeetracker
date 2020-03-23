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
    } else if (answer.toDo === "Add Employee") {
			// Add employee
			addEmployee();
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

// Need to get the Role table titles only as a list for the choices for inquirer
// When add an employee
// function getRoleTitle(){
//   connection.query('SELECT * FROM role', (err, roles) => {
//     if(err) throw err;
//     const roleTable = roles.map(role => role.title);
//   // console.log(roleTable);
//   })
// }

// Need to get the Employee table names only as a list for the choices for inquirer
// When add a manager for an employee
// function getEmployeeNames(){
//   connection.query('SELECT * FROM employee', (err, employees) => {
//     if(err) throw err;

//     let employeeTable = employees.map(employee => employee.first_name + ` ` + employee.last_name);

//     // ??????? Have to add None to the array
//     //  employeeTable = employeeTable.push('None');
//   console.log(employeeTable);
//   })
// }


// Add Employee
// Need to get the role and manager list before can start inquirer
function addEmployee() {

// connection to get the role titles from the role table
  connection.query('SELECT * FROM role', (err, roles) => {
    if(err) throw err;
    const roleTable = roles.map(role => role.title);
 

// connection to get the employee names as a selection list for the manager
      connection.query('SELECT * FROM employee', (err, employees) => {
        if(err) throw err;
    
        let employeeTable = employees.map(employee => employee.first_name + ` ` + employee.last_name);


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

		connection.query("INSERT INTO employee SET ?", 
		{
			first_name: answer.firstName,
      last_name: answer.lastName,
      
      // ??????  need to do a join to figure out what role_id and manager_id to put in to the employee table
// 			role_id: answer.role,
// 			manager_id: answer.maanger
		}, (err) => {
			if(err) throw err;
      console.log("Successfully entered your employee");
      viewEmployees();
			start();
		});
	})
})
})
}