const mysql = require('mysql2');

const fs = require('fs');
const path = require('path');
const pathUtil = require('./path');

const p = path.join(pathUtil,
  'data',
  'db_cred.json');

const tmp = fs.readFileSync(p);
const db_credentials = JSON.parse(tmp);

const pool = mysql.createPool({
  host: db_credentials['host'],
  user: db_credentials['user'],
  database: db_credentials['database'],
  password: db_credentials['password']
});
module.exports = pool.promise();