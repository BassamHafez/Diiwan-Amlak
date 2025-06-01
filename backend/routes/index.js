const authRoutes = require("../routes/authRoutes");
const subscriptionRoutes = require("../routes/subscriptionRoutes");
const packageRoutes = require("../routes/packageRoutes");
const accountRoutes = require("../routes/accountRoutes");
const userRoutes = require("../routes/userRoutes");
const compoundRoutes = require("../routes/compoundRoutes");
const estateRoutes = require("../routes/estateRoutes");
const contactRoutes = require("../routes/contactRoutes");
const brokerContactRoutes = require("../routes/brokerContactRoutes");
const landlordContactRoutes = require("../routes/landlordContactRoutes");
const serviceContactRoutes = require("../routes/serviceContactRoutes");
const tenantContactRoutes = require("../routes/tenantContactRoutes");
const tagRoutes = require("../routes/tagRoutes");
const contractRoutes = require("../routes/contractRoutes");
const revenueRoutes = require("../routes/revenueRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const taskRoutes = require("../routes/taskRoutes");
const reportRoutes = require("../routes/reportRoutes");
const statsRoutes = require("../routes/statsRoutes");
const configRoutes = require("../routes/configRoutes");
const testimonialRoutes = require("../routes/testimonialRoutes");
const supportRoutes = require("../routes/supportRoutes");
const termRoutes = require("../routes/termRoutes");

const { apiGeneralLimiter, authLimiter } = require("../middleware/rateLimiter");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authLimiter, authRoutes);

  app.use("/api/v1/subscriptions", apiGeneralLimiter, subscriptionRoutes);
  app.use("/api/v1/packages", apiGeneralLimiter, packageRoutes);
  app.use("/api/v1/accounts", apiGeneralLimiter, accountRoutes);
  app.use("/api/v1/users", apiGeneralLimiter, userRoutes);
  app.use("/api/v1/compounds", apiGeneralLimiter, compoundRoutes);
  app.use("/api/v1/estates", apiGeneralLimiter, estateRoutes);
  app.use(
    "/api/v1/estates/:estateId/contracts",
    apiGeneralLimiter,
    contractRoutes
  );
  app.use("/api/v1/contacts", apiGeneralLimiter, contactRoutes);
  app.use("/api/v1/contacts/brokers", apiGeneralLimiter, brokerContactRoutes);
  app.use(
    "/api/v1/contacts/landlords",
    apiGeneralLimiter,
    landlordContactRoutes
  );
  app.use("/api/v1/contacts/services", apiGeneralLimiter, serviceContactRoutes);
  app.use("/api/v1/contacts/tenants", apiGeneralLimiter, tenantContactRoutes);
  app.use(
    "/api/v1/estates/:estateId/revenues",
    apiGeneralLimiter,
    revenueRoutes
  );
  app.use("/api/v1/expenses", apiGeneralLimiter, expenseRoutes);
  app.use("/api/v1/reports", apiGeneralLimiter, reportRoutes);
  app.use("/api/v1/stats", apiGeneralLimiter, statsRoutes);
  app.use("/api/v1/tags", apiGeneralLimiter, tagRoutes);
  app.use("/api/v1/tasks", apiGeneralLimiter, taskRoutes);
  app.use("/api/v1/configs", apiGeneralLimiter, configRoutes);
  app.use("/api/v1/testimonials", apiGeneralLimiter, testimonialRoutes);
  app.use("/api/v1/support", apiGeneralLimiter, supportRoutes);
  app.use("/api/v1/terms", apiGeneralLimiter, termRoutes);
};

module.exports = mountRoutes;
