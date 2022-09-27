// installed requirements + nodemon
const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('mysql2');
const cTable = require("console.table");


const server = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  port: 3306,
  database: "module12"
});

// connects to mysql database
server.connect(function (err) {
  if (err) throw err;
  console.log(chalk.greenBright.bold('\nServer Connected!\n'));

  // add the function that starts that communicates with mysql
  log()
});


// inquirer.prompt(questions, (answers) => {
//   console.log(answers);
// });

function log() {
  inquirer.prompt([
    {
      type: "list",
      name: "command",
      prefix: chalk.whiteBright('❱'),
      message: chalk.whiteBright('Select an option below.'),
      choices: ["View", "Insert", "Update"]
    },
  ])
    .then((res) => {
      console.log(res)
    })
}












// connect to the database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'admin',
//         database: 'team_db'
//     },
//     console.log(`Connected to team_db database`)
// )



// db.query('SELECT * from roles')