var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});


connection.connect(function(error) {
  if (error) {
    console.log('mysql connect error');
    return;
  } else {
    console.log('success !');
  }
});
module.exports = connection;