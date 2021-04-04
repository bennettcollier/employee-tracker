const inquirer = require('inquirer');
require('./server_promise');
const cTable = require('console.table');
 
const promptStart = () => {
    return inquirer.prompt([ 
        {
            type: 'list',
            name: 'choice',
            message: 'Please make a selection.',
            choices:    ["View all departments",
                        "View all employees",
                        "View all roles",
                        "Add a department",
                        "Add an employee",
                        "Add a role",
                        "Update an employee",]
        }
    ]);
};

const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of the new department?',
            validate: nameInput => {
                if(nameInput){
                  return true;
                } else {
                  console.log("Please enter a valid new department name.");
                  return false;
                }
              }
        }
    ]).then(res => {
       addDepartment(res.newDepartment);
    });
};


const promptAddRole = async() => {
    let deptlist = await allDepartments()
    
    list = deptlist.map(({DeptNo , Department}) => ({name:Department, value:DeptNo}))

    return inquirer.prompt([
        {
            name: 'newRoleTitle',
            type: 'input',
            message: 'What is the name of the new role?',
            validate: nameInput => {
                if(nameInput){
                  return true;
                } else {
                  console.log("Elease enter a valid role.");
                  return false;
                }
              }
        },
        {
            name: 'newRoleDepartment',
            type: 'list',
            message: 'What department is this new role in?',
            choices: list  
        }
    
    ]).then(InqRes => { 
        input = {
            title:InqRes.newRoleTitle, 
            salary:InqRes.newRoleSalary,
            department_id: InqRes.newRoleDepartment
        }
        addRole(input);    
    });
};

promptAddEmployee = async () => {
    const roles = await allRoles();
    const roleslist =  roles.map(({Id , Title}) => ({name:Title, value:Id}))
    const managers = await allEmployees();
    const managerlist = managers.map(({Name, No}) => ({name:Name, value:No})); 

    return inquirer.prompt([
        {
            name: 'newEmployeeFirstName',
            type: 'input',
            message: 'What is their first name?',
            validate: nameInput => {
                if(nameInput){
                  return true;
                } else {
                  console.log("Please enter a valid first name.");
                  return false;
                }
              }
        },
        {
            name: 'newEmployeeLastName',
            type: 'input',
            message: 'What is their last name?',
            validate: nameInput => {
                if(nameInput){
                  return true;
                } else {
                  console.log("Please enter a valid last name");
                  return false;
                }
              }
        },
        {
            name: 'newEmployeeManagerNo',
            type: 'list',
            message: 'Who is thier manager?',
            choices: managerlist  
        },
        {
            name: 'newEmployeeRoleNo',
            type: 'list',
            message: 'What is their role?',
            choices: roleslist  
        }
        
    ]).then(empInp => {
        newEmployeeObj = {
            "first_name" : empInp.newEmployeeFirstName,
            "last_name": empInp.newEmployeeLastName,
            "role_id" : empInp.newEmployeeRoleNo,
            "manager_id" : empInp.newEmployeeManagerNo
        };
        addEmployee(newEmployeeObj); 
    });
}


promptUpdateEmployee = async () => {   
    const InqRes = await inquirer.prompt([ 
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to update?',
            choices:    [
                        "Their role",
                        "Their manager"
                        ]
        }
    ])
    if(InqRes.choice === "Role"){
       await promptUpdateEmployeeRole()
    };   
    if(InqRes.choice === "Manager"){
        await promptUpdateEmployeeManager()
    }; 
}; 

promptUpdateEmployeeRole = async () => {
    const roles = await allRoles();
    const roleslist =  roles.map(({Id , Title}) => ({name:Title, value:Id}))
    const employees = await allEmployees();
    const employeeslist = employees.map(({Name, No}) => ({name:Name, value:No})); 

    const inqRes = await inquirer.prompt([
    {
        name: 'employeeNo',
        type: 'list',
        message: 'Who would you like to update?',
        choices: employeeslist  
    },
    {
        name: 'newRoleNo',
        type: 'list',
        message: 'What is their new role?',
        choices: roleslist  
    },
    ])         
    updateEmployeeRole(inqRes.employeeNo, inqRes.newRoleNo);
}


promptUpdateManager = async () => {
    const employees = await allEmployees();
    const employeeslist = employees.map(({Name, No}) => ({name:Name, value:No})); 

    const inqRes = await inquirer.prompt([
    {
        name: 'employeeNo',
        type: 'list',
        message: 'Who do you want to update?',
        choices: employeeslist  
    },
    {
        name: 'newRoleNo',
        type: 'list',
        message: 'Who is the new manager?',
        choices: employeeslist  
    },
    ])
    updateEmployeeManager(inqRes.employeeNo, inqRes.newRoleNo);
}

function main() {
    promptStart().then(res =>{
        switch(res.choice){
            case "View all departments":
                allDepartments().then(res=>{
                    console.table(cTable.getTable(res));
                }).then(res=>{
                    main()
                });
                break;
            case "View all employees":
                allRoles().then(res=>{
                    console.table(cTable.getTable(res));
                }).then(res=>{
                    main()
                });
                break;
    
            case "View all roles":
                allEmployees().then(res=>{
                    console.table(cTable.getTable(res));
                }).then(res=>{
                    main()
                });
                break;

            case "Add a department":
                promptAddDepartment()
                .then(res =>{
                    main();
                });
                break;

            case "Add an employee":    
                    promptAddRole().then(res =>{
                        main();
                    });
                break;

            case "Add a role":
                    promptAddEmployee()
                    .then(res =>{
                        main();
                    });;
                    break;

            case "Update an employee":
                promptUpdateEmployee()
                .then(res =>{
                    main();
                });
                break;    
        }   
    });
};

main();
