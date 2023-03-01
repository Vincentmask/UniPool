const express = require('express');
const { Pool } = require('pg');
const app = express();

// create a new client instance
const client = new Client({
  user: 'haosheng',
  host: 'dbase.cecs.pdx.edu',
  database: 'haosheng',
  password: 'pw3m3pb#Dp',
  port: 5432,
});

app.get('/api/records', (req, res) => {
  pool.query('SELECT * FROM Event', (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
      res.status(500).send('Internal server error');
    } else {
      res.json(result.rows);
    }
  });
});

const port = 58941; // or any other port you want to use
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
