const connection = require("./config")

class DB {

    constructor(connection) {
        this.connection = connection
    }


    viewemp() {
        return this.connection.query('SELECT employee.id AS ID, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id =  department.id LEFT JOIN employee manager ON employee.manager_id = manager.id')

    }

    viewdept() {
        return this.connection.query('SELECT name AS Department FROM department')

    }
    viewrole() {
        return this.connection.query('SELECT role.id AS ID, role.title AS "Role Title", role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id')
    }

    addemployee(answer) {
        return this.connection.query("INSERT INTO employee SET ?", answer)


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