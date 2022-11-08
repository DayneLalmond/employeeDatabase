// installed requirements
const inquirer = require('inquirer');
const chalk = require('chalk');
const server = require('./db/connection');
const cTable = require('console.table');
const figlet = require('figlet');
const { default: CheckboxPrompt } = require('inquirer/lib/prompts/checkbox');

// const table = cTable.getTable();
var time = 0;

// query promise allows the function to give an array of items from the target selected
const queryPromise = (statement, params) => {
  return new Promise((resolve, reject) => {
    server.query(statement, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}


// connects to mysql database
server.connect(function (err) {
  if (err) throw err;
  // adds the function to determine how long the server takes to turn on
  function addCount() {
    for (var i = 1; i < 100000; i++) {
      time += i;
    }
    return time;
  }
  const duration = ('\nServer connected in')
  const online = (chalk.blueBright.bold(figlet.textSync('Database Online', { horizontalLayout: 'fitted' })
  ))
  console.log(online)
  console.time(duration)

  addCount()
  console.timeEnd(duration)

  log()
});

// function to add a delay to the terminal
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


// ENTER INITIAL LOG
function log() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Select an option below.\n\n',
      choices: ['View database tables.', 'Add new employee.', 'Update employee.', 'Create new role.', 'Create new department.', 'Admin panel', new inquirer.Separator(), 'Exit.', new inquirer.Separator()]
    }
  ])
    .then((res) => {
      switch (res.command) {
        case 'View database tables.': view()
          break;
        case 'Add new employee.': addEmployee()
          break;
        case 'Update employee.': updateEmployee()
          break;
        case 'Create new role.': addRole()
          break;
        case 'Create new department.': addDepartment()
          break;
        case 'Admin panel': check()
          break;
        case 'Exit.': server.close()
      }
    })
};

// ENTER VIEW MODE
function view() {
  inquirer.prompt([{
    type: 'list',
    name: 'view',
    message: (chalk.blueBright.bold('Opening menu...\n')),
    choices: ['Department', 'Role', 'Employee']
  }]
  )
    .then((res) => {
      switch (res.view) {
        case 'Department':
          server.query(`SELECT * FROM company_db.department`, function (err, results) {
            if (err) throw err;
            // the delay is entered here after logging the department view
            console.log(chalk.blueBright.bold('Entering department table...'))
            delay(1000).then(() => {
              console.table(results)
              delay(1000).then(() => {
                log()
              })
            })
          })
          break;
        case 'Role':
          server.query(`SELECT * FROM company_db.role`, function (err, results) {
            if (err) throw err;
            console.log(chalk.blueBright.bold('Entering role table...'))
            delay(1000).then(() => {
              console.table(results)
              delay(1000).then(() => {
                log()
              })
            })
          })
          break;
        case 'Employee':
          server.query(`SELECT * FROM company_db.employee`, function (err, results) {
            if (err) throw err;
            console.log(chalk.blueBright.bold('Entering employee table...'))
            delay(1000).then(() => {
              console.table(results)
              delay(1000).then(() => {
                log()
              })
            })
          })
      }
    })
};

// DOUBLE CHECK THE USER WANTS TO ENTER ADMIN PANEL
function check() {
  inquirer.prompt([{
    type: 'list',
    name: 'check',
    message: (chalk.yellowBright.bold('Modifications in the admin panel are permanent. Be advised, the commands cannot be undone.\n Some actions may require later revision of exisiting data to avoid erasing relevant data.\n Continue?\n\n')),
    choices: [(chalk.greenBright.bold('  ⮚  Yes\n')), (chalk.redBright.bold('  ⮚  No\n'))]
  }])
    .then((res) => {
      switch (res.check) {
        case (chalk.greenBright.bold('  ⮚  Yes\n')):
          console.log(chalk.blueBright.italic('Entering admin panel...\n'))
          delay(1000).then(() => {
            inquirer.prompt([{
              type: 'list',
              name: 'opt',
              message: 'Select an option.\n',
              choices: ['Remove employee.', 'Delete role.', 'Delete department.']
            }])
              .then((res) => {
                switch (res.opt) {
                  case 'Remove employee.':
                    removeEmployee()
                    break;
                  case 'Delete role.':
                    deleteRole()
                    break;
                  case 'Delete department.':
                    deleteDepartment()
                    break;
                }
              })
          })
          break;
        // CANCEL ENTERING ADMIN PANEL, RETURN TO TABLES
        case (chalk.redBright.bold('  ⮚  No\n')):
          console.log(chalk.blueBright.italic('Returning to tables\n'))
          delay(1000).then(() => {
            log()
          })
      }
    })
};


// INSERT NEW EMPLOYEE
function addEmployee() {
  inquirer.prompt([{
    type: 'input',
    name: 'first',
    message: (chalk.yellowBright.bold('Enter first name.\n\n'))
  }, {
    type: 'input',
    name: 'last',
    message: (chalk.yellowBright.bold('Enter last name.\n\n'))
  }, {
    type: 'list',
    name: 'role',
    message: (chalk.yellowBright.bold('Assign role.\n\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT role.role_title AS name, role.role_id AS VALUE FROM role`, `${answers.role}`)
      return results;
    }
  }, {
    type: 'list',
    name: 'manager',
    message: 'Who is bossman?',
    choices: async (answers) => {
      // The results displayed ONLY work because the `value` is lowercase. I still don't understand why it is case sensitive but this was the most time consuming troubleshoot for me.
      const results = await queryPromise(`SELECT employee_firstname AS name, employee_id AS value FROM employee`, `${answers.manager}`)
      return results;
    }
  }])
    .then((res) => {
      server.query(`INSERT INTO company_db.employee (employee_firstname, employee_lastname, employee_role, manager_id) VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully added ' + res.first + ' ' + res.last + ' as ' + res.role + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};

// UPDATE EMPLOYEE
function updateEmployee() {
  inquirer.prompt([{
    type: 'list',
    name: 'name',
    message: (chalk.yellowBright.bold('Select employee.\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT employee_firstname AS firstname, employeeemployee_id AS VALUE FROM employee`, `${answers.name}`)
      return results;
    }
  }, {
    type: 'list',
    name: 'role',
    message: (chalk.yellowBright.bold('Reassign role.\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT role.role_title AS name, role.role_salary AS VALUE FROM role`, `${answers.role}`)
      return results;
    }
  }])
    .then((res) => {
      server.query(`INSERT INTO employee (employee_firstname, employee_role) VALUES ('${res.name}', '${res.role}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully added ' + res.name + ' as ' + res.role + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};

// INSERT NEW DEPARTMENT
function addDepartment() {
  inquirer.prompt([{
    type: 'input',
    name: 'department',
    message: (chalk.yellowBright.bold('Enter name of the department.\n\n'))
  }])
    .then((res) => {
      server.query(`INSERT INTO company_db.department (department_name) VALUES ('${res.department}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully added ' + res.department + ' to departments' + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};


// INSERT NEW ROLE
function addRole() {
  inquirer.prompt([{
    type: 'input',
    name: 'title',
    message: (chalk.yellowBright.bold('Enter title of the role.\n\n'))
  }, {
    type: 'input',
    name: 'salary',
    message: (chalk.yellowBright.bold('Enter salary of the role.\n\n'))
  }, {
    type: 'list',
    name: 'department',
    message: (chalk.yellowBright.bold('Select the department it belongs to.\n\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT department.department_name AS name, department.department_id AS VALUE FROM department`, `${answers.department}`)
      return results;
    }
  }])
    .then((res) => {

      //NEED TO ADJUST THE DEPARTMENT THE ROLE IS UNDER IN THE DATABASE

      server.query(`INSERT INTO role (role_title, role_salary, department_id) VALUES ('${res.title}', '${res.salary}', '${res.department}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully added ' + res.title + ' to roles' + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};

// REMOVE EMPLOYEE
function removeEmployee() {
  inquirer.prompt([{
    type: 'list',
    name: 'employee',
    message: (chalk.yellowBright.bold('Remove whom?\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT CONCAT(employee_firstname, ' ', employee_lastname) AS name, employee_id AS value FROM employee`, `${answers.firstname}`, `${answers.lastname}`)
      return results;
    }
  }])
    .then((res) => {
      server.query(`DELETE FROM employee WHERE CONCAT(employee_firstname, ' ', employee_lastname) = ('${res.firstname}', ' ', '${res.lastname}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully removed ' + res.employee + ' from employees ' + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};


// DELETE ROLE
function deleteRole() {
  inquirer.prompt([{
    type: 'list',
    name: 'role',
    message: (chalk.yellowBright.bold('Delete which role?\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT role.role_title AS name, role.role_id AS VALUE FROM role`, `${answers.role}`)
      return results;
    }
  }])
    .then((res) => {
      server.query(`DELETE FROM role WHERE role_title = ('${res.role}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully removed ' + res.role + ' from roles ' + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};


// DELETE SELECTED DEPARTMENT
function deleteDepartment() {
  inquirer.prompt([{
    type: 'list',
    name: 'department',
    message: (chalk.yellowBright.bold('Delete which department?\n\n')),
    choices: async (answers) => {
      const results = await queryPromise(`SELECT department.department_name AS name, department.department_id AS VALUE FROM department`, `${answers.department}`)
      return results;
    }
  }])
    .then((res) => {
      server.query(`DELETE FROM department WHERE department_name = ('${res.department}')`, function (err) {
        if (err) throw err;
        console.log(res)
        console.log(chalk.greenBright.italic('\nSuccesfully removed ' + res.department + ' from departments. ' + '\n'))
        delay(1000).then(() => {
          log()
        })
      })
    })
};