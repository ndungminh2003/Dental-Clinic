const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();
const PORT = Number(process.env.DBMS_PORT);
const config = {
  user: process.env.DBMS_USERNAME,
  password: process.env.DBMS_PASSWORD,
  server: process.env.DBMS_SERVER,
  port: PORT,
  database: process.env.DATABASE_NAME,
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: true, // Sử dụng kết nối mã hóa SSL
  },
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 60000,
  },
};

const ConnectMSSQL = async () => {
  try {
    await sql.connect(config);
    console.log("SQL Server connection successful !\n");
  } catch (error) {
    console.error("SQL Server connection error !\n");
  }
};

const poolConnect = async () => {
  try {
    let pool = new sql.ConnectionPool(config);
    await pool.connect(config);
    return pool;
  } catch (error) {
    console.error("poolconnect connection error !\n");
  }
};

module.exports = { ConnectMSSQL, poolConnect };
