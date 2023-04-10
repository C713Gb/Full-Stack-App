import mysql from "mysql2";

let db = mysql.createPool({
  host: '127.0.0.1',
  user: "root",
  password: "root",
  database: "historical_prices",
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
