const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const port = process.env.port;
const fs = require("fs");
const logger = require("../winster.logger").logger;
const path = require("path");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");

// const logFilePath = path.join(__dirname, "logs.txt");

// Delete existing log file if it exists
// if (fs.existsSync(logFilePath)) {
//   fs.unlinkSync(logFilePath);
// }

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

// const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// console.log = function (...args) {
//   logStream.write(args.map((arg) => JSON.stringify(arg)).join(" ") + "\n");
// };

app.get("/", (req, res) => {
  console.log("hello!!!");
  res.send("Hello World!");
});

// db.seq.options.logging = function (query) {
//   console.log(`[SQL Query] ${query}`);
// };

// Set a cookie
// app.get("/set-cookie", (req, res) => {
//   res.cookie("username", "chetan_patil", { maxAge: 900000, httpOnly: true });
//   res.send("Cookie set");
// });

// // Read a cookie
// app.get("/get-cookie", (req, res) => {
//   const username = req.cookies.username;
//   console.log(username, "username");

//   res.send(`Username: ${username}`);
// });

app.use(function (req, res, next) {
  req["db"] = db;
  next();
});

app.use("/auth", require("./routes/user.router"));
app.use("/cookie", require("./routes/cookie.router"));

db.seq.sync().then(
  async (success) => {
    try {
      app.listen(port, () => {
        console.log(`Example app listening on port ${process.env.port}`);
        console.log("hii");
        // logger.error("hiii");
      });
    } catch (e) {
      console.log(e);
    }
  },
  (fail) => {
    console.log(fail);
    console.log("DB_SYNC_ERROR");
    process.exit(11);
  }
);
