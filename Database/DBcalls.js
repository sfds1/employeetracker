const connection = require("./config")

class DB {

    constructor(connection) {
        this.connection = connection
    }


    viewemp() {
        return this.connection.query('SELECT employee.id AS "ID", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id')

    }

    // this is for the other calls to update data as want to use the table column headings
    viewemp2() {
        return this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id')

    }

    viewdept() {
        return this.connection.query('SELECT name AS Department FROM department')

    }
    viewrole() {
        return this.connection.query('SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id')
    }

    // can use answer here since the inquirer names are the same as the table column names
    addemployee(answer) {

        return this.connection.query("INSERT INTO employee SET ?", answer)
        ,{first_name: answer.Firt_name, rele_Id:id}


    }

    exit(){
        return this.connection.end()
    }
}

module.exports = new DB(connection)


// var employee = db.viewemp()






// class Car{

//     constructor(owner,brand,model, color){
//         this.name=owner,
//         this.brand = brand,
//         this.model = model,
//         this.color =color
//     }

//     stop() {
//         console.log("stop: ", this.brand)

//     }
//     start(){
//         console.log("start:",this.brand,this.color)
//     }
// }

// var StepCar = new Car("Step","xxx", "yyyy", "white")
// var IsabelCar = new Car("isabel", "toyota","prius","red")

// console.log(StepCar)

// StepCar.start()