const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'harry',
  password: 'MyStrongPassword1234$',
  database: 'crediblesteel'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database successfully!');
});

module.exports = connection;