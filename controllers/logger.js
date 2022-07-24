const { createLogger, transports, format } = require("winston");

// logging function

//success function
const deviceLogger = createLogger({
  transports: [
    new transports.File({
      filename: "application.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    //error function
    new transports.File({
      filename: "application-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = { deviceLogger };
