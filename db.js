import mysql from "mysql2";

let db = mysql.createPool({
  host: 'sql12.freemysqlhosting.net',
  user: "sql12614354",
  password: "4SxyspbcyV",
  database: "sql12614354",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Attempt to catch disconnects
db.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

export default db;
