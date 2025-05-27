const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./utils/logger");

process.on("uncaughtException", (err) => {
  logger.error(`Unhandled Exception! 💥 Shutting down...
      Time: ${new Date()}`);
  logger.error(err);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info(`DB connect successfully. Time: ${new Date()}`));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}. Time: ${new Date()}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection! 💥 Shutting down...
    Time: ${new Date()}`);
  // console.log(err.name, err.message);
  logger.error(err);
  server.close(() => {
    process.exit(1);
  });
});
