var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.1.2.101',
  user     : 'user',
  password : 'password',
  database : 'sevenhillsdb'
});

connection.connect();

connection.query('SELECT tagName FROM tags', function(err, rows, fields) {
  if (err) throw err;

  console.log('All tags: ', rows);
});

connection.end();