import mysql from "mysql2";

let db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "historical_prices",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
