const { Pool } = require('pg');
require('dotenv').config();



// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'black-life',
//     password: process.env.POSTGRES_PASSWORD,
//     port: 5432,
//   })

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://agrpldks:0ID9WIzQ1cyfwxj7sgzc-ui5BGF1IeRG@suleiman.db.elephantsql.com:5432/agrpldks" //Can be found in the Details page
var pool = new pg.Client(conString);

module.exports = pool