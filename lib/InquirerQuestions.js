const pool = require("../db/database");
const { sqlSelectEmp, sqlDep } = require("../db/queries");

const choices = [
  "View Departments",
  "View Roles",
  "View Employees",
  "Add Department",
  "Add Role",
  "Add Employee",
  "Update Employee Role",
  "Remove Employee",
  "Exit",
];

const questions = {
  initial: [
    {
      type: "checkbox",
      name: "initial",
      message: "Make your selection.",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Remove Employee",
        "Exit",
      ],
    },
  ],

  newEmp: [
    {
      type: "input",
      name: "firstName",
      message: "Enter employee's first name.",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter employee's last name.",
    },
    roleQuestion,
    {
      type: "checkbox",
      name: "manager",
      message: "Select manager.",
      choices: async function getManager() {
        const result = await pool.query(`SELECT CONCAT(first_name,' ', last_name) AS manager  
        FROM employee;
        `);
        const managers = await result.map((manager) => manager.manager);
        return managers;
      },
    },
  ],

  addDep: [
    {
      type: "input",
      name: "department",
      message: "Enter the new department.",
    },
  ],

  addRole: [
    {
      type: "input",
      name: "title",
      message: "Enter the new role.",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary amount.",
    },
    {
      type: "checkbox",
      name: "departmentName",
      message: "Select the department for the new role.",
      choices: async function getDeps() {
        try {
          const result = await pool.query(sqlDep);
          const deps = await result.map((dep) => dep.name);
          return deps;
        } catch (err) {
          console.log(err);
        }
      },
    },
  ],
  updateEmp: [
    {
      type: "checkbox",
      name: "fullName",
      message: "Select which employee you would like to update.",
      choices: async function updateEmployee() {
        const result = await pool.query(sqlSelectEmp);
        const empToDelete = await result.map((emp) => emp.fullName);
        return empToDelete;
      },
    },
    roleQuestion,
  ],
  removeEmp: [
    {
      type: "checkbox",
      name: "removeEmpName",
      message: "Select the employee you would like to remove.",
      choices: async function delEmployee() {
        const result = await pool.query(sqlSelectEmp);
        const empToDelete = await result.map((emp) => emp.fullName);
        return empToDelete;
      },
    },
  ],
};

const roleQuestion = {
    type: "checkbox",
    name: "title",
    message: "Select the employee's role.",
    choices: async function getRoles() {
      const result = await pool.query(`SELECT title FROM role`);
      const roles = await result.map((role) => role.title);
      return roles;
    },
  };

module.exports = { choices, questions, roleQuestion };