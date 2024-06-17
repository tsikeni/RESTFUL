const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '11978IJTi$iratuzi',
  database:'try',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database successfully as id ' + db.threadId);
});

module.exports = db;
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '11978IJTi$iratuzi';


