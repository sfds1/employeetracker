
const inquirer = require("inquirer");
const cTable = require("console.table");
const dbcalls = require("./Database/DBcalls");

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
         // "View All Employees By Department",
         // "View All Employee By Manager",
         // "Remove Employee",
         // "Update Employee Manager",
         // "Remove Role",
         "Exit"
      ]
   }).then(answer => {

      // use switch instead of if..then...else statements
      switch (answer.toDo) {
         case "View All Employees":
            // View Employee table function
            viewEmployees();
            break;
         case "View All Departments":
            // View Department table function
            viewDepartments();
            break;
         case "View All Roles":
            // View Role table function
            viewRoles();
            break;
         case "Add Employee":
            // Add employee
            addEmployee();
            break;
         case "Add Department":
            // Add department
            addDepartment();
            break;
         case "Add Role":
            // Add role
            addRole();
            break;
         case "Update Employee Role":
            // Update employee role
            updateRole();
            break;
         case "Exit":
            connection.end();
      }

   });
};

start();


async function viewEmployees() {

   const employees = await dbcalls.viewemp()
   console.table(`Employee Listing:`, employees);
   // Once the employee table is listed, then call start again to choose another option
   start();

}

async function viewDepartments() {

   const department = await dbcalls.viewdept()
   console.table(`Department Listing:`, department);
   // Once the department table is listed, then call start again to choose another option
   start();

}
async function viewRoles() {

   const role = await dbcalls.viewrole()
   console.table(`Role Listing:`, role);
   // Once the role table is listed, then call start again to choose another option
   start();

}

async function addEmployee() {

   // Creates a role table to choose the role
   const roles = await dbcalls.viewrole()
   console.log(roles);
   const roleTable = roles.map(({ id, role }) => ({ name: role.title, value: role.id }));

   console.log(roleTable);
   // Creating the employee list by concatenating the names to choose the manager
   const employees = await dbcalls.viewemp()
   let employeeTable = employees.map((employee) => ({ name: employee.first_name + ` ` + employee.last_name, value: employee.id }));
   // adding "No Manager" as an option to the Manager list
   employeeTable.push([{ name: "No Manager", value: null }])
   console.log(employeeTable);

   // const answer = await askEmp()
   // inquirer.prompt([
   //    {
   //       name: "first_name",
   //       type: "input",
   //       message: "What is the first name of the employee?"
   //    },
   //    {
   //       name: "last_name",
   //       type: "input",
   //       message: "What is the last name of the employee?"
   //    },
   //    {
   //       name: "role_id",
   //       type: "list",
   //       choices: roleTable,
   //       message: "What is the employee's role?"

   //    },
   //    {
   //       name: "manager_id",
   //       type: "list",
   //       message: "Who is the employee's manager?",
   //       choices: employeeTable
   //    }

   // ]).then(answer => {
   //    console.log(answer);
   //    await dbcalls.addEmployee(answer);
   //    console.log("I am back")
   //    start()
   // })


   async function askEmp() {
      return inquirer.prompt


   }

   // Once the employee table is listed, then call start again to choose another option
   start();

}