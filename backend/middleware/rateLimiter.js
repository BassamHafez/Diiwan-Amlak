const rateLimit = require("express-rate-limit");

// General API rate limiter
const apiGeneralLimiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
  keyGenerator: (req) => req.ip,
});

// Auth endpoints rate limiter (for login, register, forgot password)
const authLimiter = rateLimit({
  max: 15,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message:
    "Too many authentication attempts, please try again after 15 minutes",
  keyGenerator: (req) => req.ip,
});

// // User and account operations rate limiter
// const userAccountLimiter = rateLimit({
//   max: 30,
//   windowMs: 60 * 60 * 1000, // 1 hour
//   message: 'Too many account operations, please try again after an hour',
//   keyGenerator: (req) => req.ip,
// });

module.exports = {
  apiGeneralLimiter,
  authLimiter,
};
