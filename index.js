// installed requirements
const inquirer = require('inquirer');
const chalk = require('chalk');
const server = require('./db/connection');
const cTable = require('console.table');

const table = cTable.getTable();


// connects to mysql database
server.connect(function (err) {
  if (err) throw err;
  console.log(chalk.greenBright.bold('\nServer Connected!\n'));

  // add the function that starts that communicates with mysql
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
      message: 'Select an option below.',
      choices: ['View', 'Insert', 'Update']
    },
  ])
    .then((res) => {
      switch (res.command) {
          case 'View':
            view()
        break;
          case 'Insert':
            check()
        break;
          case 'Update':
            update()
      }
    })
  };
      
// ENTER VIEW MODE
function view() {
  inquirer.prompt([{
    type: 'list',
    name: 'view',
    message: (chalk.greenBright.bold('Viewing tables...\n')),
    choices: ['Department', 'Role', 'Employee']
  }]
  )
    .then((res) => {
      switch (res.view) {
          case 'Department':
            server.query('SELECT * FROM department', function (err, results) {
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
            server.query('SELECT * FROM role', function (err, results) {
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
            server.query('SELECT * FROM employee', function (err, results) {
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
   
// DOUBLE CHECK THE USER WANTS TO INSERT NEW DATA    
function check() {
  inquirer.prompt([{
    type: 'list',
    name: 'check',
    message: (chalk.yellowBright.bold('You are about to modify the database. Continue?\n')),
    choices: [(chalk.greenBright.bold('  ⮚  Yes\n')), (chalk.redBright.bold('  ⮚  No\n'))]
  }])
  .then((res) => {
  switch (res.check) {
    case (chalk.greenBright.bold('  ⮚  Yes\n')):
      console.log(chalk.blueBright.italic('Launching editor GUI\n'))
      delay(1000).then(() => {
        insert()
      })
      break;
    case (chalk.redBright.bold('  ⮚  No\n')):
      console.log(chalk.blueBright.italic('Returning to tables\n'))
      delay(1000).then(() => {
        log()
      })
    }
  })
};


// ENTER INSERT MODE CURRENTLY STILL DEV
function insert() {
  inquirer.prompt([{
    type: 'input',
    name: 'insert',
    message: (chalk.blueBright.bold('Type the name of the employee.\n')),
  }])
  .then((res) => { 
    server.query(`INSERT INTO employee(employee_name)` && `VALUES('${res.name}')`, function (err, result) {
      if (err) throw err;
      // the delay is entered here after logging the department view
      console.log(chalk.blueBright.bold(result))
    })  
  })

//  concat() list of input variables to concat per value
};           


// ENTER UPDATE MODE
function update() {
  inquirer.prompt([{
    type: 'checkbox',
    name: 'update',
    message: (chalk.greenBright.bold('Select employee...\n')),
    choices: ['Supposed', 'To', 'Have', 'Array', 'Of', 'Employees']
  }])
  .then((res) => {
  switch (res.insert) {
    case 'Yes':
      console.log(chalk.greenBright.bold('Launched editor GUI\n'))
      break;
    case 'No':
      console.log(chalk.redBright.bold('Returned to menu\n'))
      log()
    }
  })
};