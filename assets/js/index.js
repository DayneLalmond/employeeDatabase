const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());


// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'team_db'
    },
    console.log(`Connected to team_db database`)
)



db.query('SELECT * from roles')