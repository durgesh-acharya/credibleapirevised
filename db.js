const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Durgesh@2006',
  database: 'crediblesteel'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database successfully!');
});

module.exports = connection;