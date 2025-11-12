import dotenv from "dotenv";
dotenv.config();

/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */
export const env = {
  // Server Configuration
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // Logging Configuration
  logLevel: process.env.LOG_LEVEL || "info",

  // Metrics Configuration
  metricsEnabled: process.env.METRICS_ENABLED === "true",

  // Application Info
  app: {
    name: process.env.APP_NAME || "DeployHub Backend",
    version: process.env.APP_VERSION || "1.0.0",
  },

  // Environment Helpers (computed properties)
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;

// Validate required environment variables
function validateEnv() {
  const required: (keyof typeof process.env)[] = ["PORT", "NODE_ENV"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

// Run validation
validateEnv();

// Export for logging/debugging purposes
export const logEnvConfig = () => {
  console.log(" Environment Configuration:");
  console.log("  Port:", env.port);
  console.log("  Environment:", env.nodeEnv);
  console.log("  Log Level:", env.logLevel);
  console.log("  Metrics Enabled:", env.metricsEnabled);
  console.log("  App Name:", env.app.name);
  console.log("  App Version:", env.app.version);
};
