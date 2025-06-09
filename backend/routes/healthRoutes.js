const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const healthcheck = {
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.status = "DOWN";
    healthcheck.error = error.message;
    res.status(503).json(healthcheck);
  }
});

// Detailed health check for internal use
router.get("/detailed", async (req, res) => {
  const healthcheck = {
    status: "UP",
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: {
      status:
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
      responseTime: await checkDatabaseResponseTime(),
    },
    memory: {
      usage: process.memoryUsage(),
      total: process.memoryUsage().heapTotal,
      used: process.memoryUsage().heapUsed,
    },
    system: {
      platform: process.platform,
      version: process.version,
      pid: process.pid,
    },
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.status = "DOWN";
    healthcheck.error = error.message;
    res.status(503).json(healthcheck);
  }
});

async function checkDatabaseResponseTime() {
  const start = Date.now();
  try {
    await mongoose.connection.db.admin().ping();
    return Date.now() - start;
  } catch (error) {
    return -1;
  }
}

module.exports = router;
