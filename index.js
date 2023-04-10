import express from "express";
import mysql from "mysql2";
import fs from "fs";
import { parse } from "csv-parse";

import bodyParser from "body-parser";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import cors from "cors";

import db from "./db.js";

const PORT = process.env.PORT || 3001;

const app = express();

const con = db;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.get("/", (req,res) => {
  res.json({
    message: "Hello World"
  });
})

app.get("/update-db", (req, res) => {
  try {
    let data = [];

    fs.createReadStream("./prices.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        row.shift();

        data.push(row);
      })
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("end", function () {
        console.log("finished");

        var sql =
          "INSERT IGNORE INTO prices (price_date, price, symbol) VALUES ?";

        con.query(sql, [data], (error, result) => {
          if (error) {
            console.log(error);
            res.json({ message: error });
            return;
          }

          console.log("Number of records inserted: " + result.affectedRows);
          res.json({
            message: "Number of records inserted: " + result.affectedRows,
          });
        });
      });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

app.get("/historical-data", (req, res) => {
  try {
    console.log(req.query);

    let symbol = req.query.symbol;
    let from_date = req.query.from_date;
    let to_date = req.query.to_date;

    let query = `SELECT * FROM prices where symbol="${symbol}" AND price_date BETWEEN "${from_date}" AND "${to_date}"`;

    // console.log(query);

    con.query(query, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.json({
          message: err,
        });
        return;
      }

      let arr = [];

      result.forEach((item) => {
        let temp = {
          x: item.price_date,
          y: parseFloat(item.price),
        };

        arr.push(temp);
      });

      res.json({
        data: arr,
      });
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

const signUp = async (req, res) => {
  try {
    con.query(
      "SELECT COUNT(*) AS count FROM `users` WHERE `email`=?",
      [req.body.email],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: err,
          });
          return;
        }

        if (result[0].count >= 1) {
          return res.status(400).json({
            message: "The E-mail already in use",
          });
        }
      }
    );

    const hashPass = await bcryptjs.hash(req.body.password, 12);

    con.query(
      "INSERT IGNORE INTO `users`(`email`,`password`) VALUES(?,?)",
      [req.body.email, hashPass],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        console.log(result);

        const theToken = jwt.sign(
          { id: result.insertId },
          "the-super-strong-secrect",
          {
            expiresIn: "1h",
          }
        );

        if (result.affectedRows === 1) {
          return res.status(201).json({
            message: "The user has been successfully inserted.",
            token: theToken,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    con.query(
      "SELECT * FROM `users` WHERE `email`=?",
      [req.body.email],
      async (err, result, fields) => {
        if (err) {
          console.log(err);
          res.json({
            message: err,
          });
          return;
        }

        if (result.length == 0) {
          return res.status(400).json({
            message: "The E-mail doesn't exist",
          });
        }

        const passMatch = await bcryptjs.compare(
          req.body.password,
          result[0].password
        );
        if (!passMatch) {
          return res.status(422).json({
            message: "Incorrect password",
          });
        }

        console.log(result[0].id);

        const theToken = jwt.sign(
          { id: result[0].id },
          "the-super-strong-secrect",
          {
            expiresIn: "1h",
          }
        );

        return res.status(201).json({
          token: theToken,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

app.post("/sign-up", signUp);

app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
