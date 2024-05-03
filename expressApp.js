const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const app = express();
const db = require("./setup/db");
const port = process.env.port;
const fs = require("fs");
const logger = require("./winster.logger").logger;
const path = require("path");
const { Sequelize } = require("sequelize");

const logFilePath = path.join(__dirname, "logs.txt");

// Delete existing log file if it exists
if (fs.existsSync(logFilePath)) {
  fs.unlinkSync(logFilePath);
}

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// console.log = function (data) {
//   logStream.write(data + "\n");
// };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// db.seq.options.logging = function (query) {
//   console.log(`[SQL Query] ${query}`);
// };

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
