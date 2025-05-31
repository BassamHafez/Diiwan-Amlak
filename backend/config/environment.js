const logger = require("../utils/logger");

const requiredEnvVars = [
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "EMAIL_USER",
  "EMAIL_PASSWORD",
  "SUPPORT_EMAIL",
  "TELR_STORE_ID",
  "TELR_AUTH_KEY",
  "TELR_AUTHORISED_URL",
  "TELR_DECLINED_URL",
  "TELR_CANCELLED_URL",
];

const validateEnv = () => {
  const missingVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(
      ", "
    )}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Validate specific environment variable formats if needed
  if (
    process.env.NODE_ENV &&
    !["development", "production", "test"].includes(process.env.NODE_ENV)
  ) {
    throw new Error(
      "NODE_ENV must be either 'development', 'production', or 'test'"
    );
  }

  // Log successful validation
  logger.info("Environment variables validated successfully");
  logger.info(`Current environment: ${process.env.NODE_ENV}`);
};

module.exports = validateEnv;
