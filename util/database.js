// const mysql = require('mysql2');

import { readFileSync } from 'fs';
import { join } from 'path';
import pathUtil from './path.js';

const p = join(pathUtil,
  'data',
  'db_cred.json');

const tmp = readFileSync(p);
const db_credentials = JSON.parse(tmp);

// const pool = mysql.createPool({
//   host: db_credentials['host'],
//   user: db_credentials['user'],
//   database: db_credentials['database'],
//   password: db_credentials['password']
// });
// module.exports = pool.promise();

import { Sequelize } from 'sequelize';

const sequelize =
  new Sequelize(
    db_credentials['database'],
    db_credentials['user'],
    db_credentials['password'],
    {
      dialect: 'mysql',
      host: db_credentials['host']
    });

export default sequelize;



