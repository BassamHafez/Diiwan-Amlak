const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

const requestLogger = (app) => {
  // Add request ID and basic logging
  app.use((req, res, next) => {
    req.requestId = uuidv4();
    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      timestamp: new Date().toISOString(),
    });
    next();
  });

  // Development logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("combined", { stream: logger.stream }));
  }
};

module.exports = requestLogger;
