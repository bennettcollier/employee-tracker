INSERT INTO department (name)
VALUES
('CEO'),
('Finance'),
('Sales'),
('Product'),
('Legal'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 2000000, 1),
('VP of Product', 350000, 4),
('General Counsel', 275000, 3),
('Engineering Manager', 200000, 6),
('Director of Sales', 150000, 2),
('Controller', 175000, 5),
('Engineer', 150000, 6),
('Lawyer', 125000, 3),
('Sales Lead', 100000, 2),
('Accountant', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Emma', 'Cott', 1,NULL),
('Patrick', 'Williams', 2, 1),
('Nick', 'Borelli', 3, 1),
('Jessica', 'Koonz', 4, 1),
('Katie', 'Alton', 5, 2),
('Joseph', 'Garcia', 6, 1),
('Landon', 'Collier', 7, 4),
('Emily', "Bates", 8, 3),
('Angela', 'Monroy', 9, 5),
('Valentina', 'Gaier', 10, 6);