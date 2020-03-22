const inquirer = require("inquirer");
var mysql = require("mysql");

// need to set up this variable whbich gives back an object
// Allows us to connect to DB
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3300
    port: 3300,
  
    // Your username
    // always will be root if on the local machine
    user: "root",
  
    // Your password
    password: "password",
    // name of the DB want to connect to
    database: "employee_trackerDB"
  });