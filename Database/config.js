// This is the file with the connection so the server

const mysql = require("mysql");
const util = require("util")

// need to set up this variable whbich gives back an object
// Allows us to connect to DB
const connection = mysql.createConnection({

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
connection.connect();
connection.query = util.promisify(connection.query)

module.exports = connection

