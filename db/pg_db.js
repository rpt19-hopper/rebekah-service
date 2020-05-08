const { Client } = require('pg');

const client = new Client({
  user: 'student',
  host: 'localhost',
  database: 'sdc',
  password: 'student',
  port: 5432,
});

client.connect(err => {
  err ? console.error('connection error', err.stack): console.log('connected');
})