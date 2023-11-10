const { poolConnect } = require("../config/dbconfig");

const load = async (sql) => {
  try {
    let pool = await poolConnect();
    const result = await pool.query(sql);
    console.log("result load:", result.recordset);
  } catch (error) {
    console.log(error);
  }
};

const add = async (tableName, entity) => {
  try {
    const pool = await poolConnect();
    const columns = Object.keys(entity).join(", ");
    const values = Object.values(entity)
      .map((value) => (typeof value === "string" ? `N'${value}'` : value))
      .join(", ");
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

    const result = await pool.query(sql);

    console.log("add :", result);
  } catch (error) {
    console.log(error);
  }
};

const del = async (tableName, condition) => {
  try {
    const pool = await poolConnect();
    const sql = `DELETE FROM ${tableName} WHERE ${condition}`;

    const result = await pool.query(sql);
    console.log("delete :", result);
  } catch (error) {
    console.log(error);
  }
};
const patch = async (tableName, entity, condition) => {
  try {
    const pool = await poolConnect();
    const updates = Object.entries(entity)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        } else {
          return `${key} = ${value}`;
        }
      })
      .join(", ");
    const sql = `UPDATE ${tableName} SET ${updates} WHERE ${condition}`;

    const result = await pool.query(sql);
    console.log("patch :", result);
  } catch (error) {
    console.log(error);
  }
};

const getTables = async () => {
  try {
    let pool = await poolConnect();
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
    `);

    const tables = result.recordset.map((r) => r.table_name);
    console.log("table", tables);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { load, add, del, patch, getTables };
