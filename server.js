const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("app"));

const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "13.215.162.232",
  user: process.env.MYSQL_USER || "true_admin",
  password: process.env.MYSQL_PASSWORD || "Jula_nove@0319",
  database: process.env.MYSQL_DB || "hoachi"
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query("SELECT email FROM tbl_user WHERE username = ? AND password = ?", [username, password]);
    if (rows.length > 0) {
      res.send("Email: " + rows[0].email);
    } else {
      res.send("Invalid login.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("DB error");
  }
});

app.listen(3000, () => console.log("App running on port 3000"));