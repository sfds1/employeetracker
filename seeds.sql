INSERT INTO department (name)
VALUES  ("Sales"),
        ("Marketing"),
        ("Legal"),
        ("Finance"),
        ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 5),
        ("Software Engineer", 120000, 5),
        ("Accountant", 125000, 4),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bob", "Ross", 1, NULL),
        ("Tim", "Duffy", 2, 1),
        ("Jane", "Doe", 3, NULL),
        ("Tanya", "Brown", 4, 3),
        ("Craig", "Knight", 5, NULL),
        ("Betty", "Chan", 6, NULL),
        ("Kevin", "Healy", 7, 6);

                
