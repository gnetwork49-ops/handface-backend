module.exports = {
  env: "development",
  port: 3000,
  jwtExpiresIn: "7d",
  corsOrigins: ["http://localhost:5173", "http://localhost:3000"],
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  db: {
    pool: {
      max: 20,
      idleTimeoutMillis: 30000
    }
  }
};