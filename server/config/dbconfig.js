const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  enableArithAbort: true,
  trustServerCertificate: true,
  encrypt: true,
};

const dbConnect = {
  guest: new mssql.ConnectionPool({
    user: process.env.DBMS_GUEST_USER,
    password: process.env.DBMS_GUEST_PASSWORD,
    server: process.env.DBMS_SERVER,
    port: Number(process.env.DBMS_PORT),
    database: process.env.DBMS_DATABASE_NAME,
    options: options,
  }).connect(),
  customer: new mssql.ConnectionPool({
    user: process.env.DBMS_CUSTOMER_USER,
    password: process.env.DBMS_CUSTOMER_PASSWORD,
    server: process.env.DBMS_SERVER,
    port: Number(process.env.DBMS_PORT),
    database: process.env.DBMS_DATABASE_NAME,
    options: options,
  }).connect(),
  dentist: new mssql.ConnectionPool({
    user: process.env.DBMS_DENTIST_USER,
    password: process.env.DBMS_DENTIST_PASSWORD,
    server: process.env.DBMS_SERVER,
    port: Number(process.env.DBMS_PORT),
    database: process.env.DBMS_DATABASE_NAME,
    options: options,
  }).connect(),
  staff: new mssql.ConnectionPool({
    user: process.env.DBMS_STAFF_USER,
    password: process.env.DBMS_STAFF_PASSWORD,
    server: process.env.DBMS_SERVER,
    port: Number(process.env.DBMS_PORT),
    database: process.env.DBMS_DATABASE_NAME,
    options: options,
  }).connect(),
  admin: new mssql.ConnectionPool({
    user: process.env.DBMS_ADMIN_USER,
    password: process.env.DBMS_ADMIN_PASSWORD,
    server: process.env.DBMS_SERVER,
    port: Number(process.env.DBMS_PORT),
    database: process.env.DBMS_DATABASE_NAME,
    options: options,
  }).connect(),
};

async function getDb(name) {
  console.log("Connect with role", name);
  return (await dbConnect[name]).request();
}

module.exports = {
  getDb,
};
