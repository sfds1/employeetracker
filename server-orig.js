// ??????  add constructor functions to make this file smaller

const inquirer = require("inquirer");
// const mysql = require("mysql");
const cTable = require("console.table");
const dbcalls = require("./Database/DBcalls");



// need to set up this variable whbich gives back an object
// Allows us to connect to DB
// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   // always will be root if on the local machine
//   user: "root",

//   // Your password
//   password: "password",
//   // name of the DB want to connect to
//   database: "employee_trackerDB"
// });

// //   need this to start the connection to the server
// connection.connect((err) => {
//   if (err) throw err;
//   start();
// });



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
      "View All Employee By Manager",
      "Remove Employee",
      "Update Employee Manager",
      "Remove Role",
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
    }


    else if (answer.toDo === "Exit") {
      // End connection to exit
      connection.end();
    }
  });

}

start();

// Show Employee Table
// function viewEmployees() {
//   connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, employees) => {
//     if (err) throw err;
//     console.table(`Employee Listing:`, employees)ß;
    // Once the employee table is listed, then call start again to choose another option
    // start();
  // })
// }


async function viewEmployees() {
 const employees = await dbcalls.viewemp()
    console.table(`Employee Listing:`, employees);
   // Once the employee table is listed, then call start again to choose another option
     start();
}

var connection;
// Show Department Table
function viewDepartments() {
  connection.query('SELECT * FROM department', (err, department) => {
    if (err) throw err;
    console.table(`Department Listing:`, department);
    // Once the department table is listed, then call start again to choose another option
    start();
  })
}

// Show Role Table
function viewRoles() {
  connection.query('SELECT role.title, role.salary, department.name AS Department FROM role LEFT JOIN department ON department.id = role.department_id', (err, role) => {
    if (err) throw err;
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

// ????? Not sure this is the best syntax  
// ????? Do I need to use async and await?  Async/Await does not work with my current code
// ????  current code works to get roles and names as choices for inquirer.  Not sure if lists became longer if would still work without async and await
// Add Employee
// Need to get the role and manager list before can start inquirer
function addEmployee() {

  //  cont roles = await db.rolesall
  //  con em
  // inqu
  // connection to get the role titles from the role table
  connection.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;
    const roleTable = roles.map((role) => ({name: role.title, value: role.id}));


    // connection to get the employee names as a selection list for the manager
    connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;

      let employeeTable = employees.map((employee) => ({ name: employee.first_name + ` ` + employee.last_name, value: employee.id }));
    

      employeeTable.push([{name:"No Manager", value:null}])
      console.log(employeeTable)

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