const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'car_rental_system',
});

const connectDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      throw err;
    }
    console.log('Connected to MySQL database');
    
  });
};

const closeDatabase = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL database connection:', err);
    }
    console.log('Closed MySQL database connection');
  });
};

module.exports = {
  connection,
  connectDatabase,
  closeDatabase,
};

