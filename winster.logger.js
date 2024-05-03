const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const myCustomLevels = {
  levels: {
    foo: 0,
    bar: 1,
    baz: 2,
    foobar: 3,
  },
  colors: {
    foo: "blue",
    bar: "green",
    baz: "yellow",
    foobar: "red",
  },
};

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

// winston.addColors(myCustomLevels.colors);

// logger.foobar("some foobar level-ed message");

module.exports = { logger };
