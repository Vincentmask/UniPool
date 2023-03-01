// var pg = require('pg');
// var connectionString =
//   'postgres://haosheng:pw3m3pb#Dp@dbase.cecs.pdx.edu/ip:5432/haosheng';
// var pgClient = new pg.Client(connectionString);
// pgClient.connect();
// const { Pool, Client } = require('pg');

// // create a new client instance
// const client = new Client({
//   user: 'haosheng',
//   host: 'dbase.cecs.pdx.edu',
//   database: 'haosheng',
//   password: 'pw3m3pb#Dp',
//   port: 5432,
// });

// // connect to the client
// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database', err.stack);
//   } else {
//     console.log('Connected to database');
//   }
// });

// // run a query on the database
// client.query('SELECT * FROM Event', (err, res) => {
//   if (err) {
//     console.error('Error running query', err.stack);
//   } else {
//     console.log('Query results:', res.rows);
//   }

//   // close the client connection
//   client.end();
// });

function openPostForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closePostForm() {
  document.getElementById('myForm').style.display = 'none';
}

function getURL(url) {
  location.href = url;
}
