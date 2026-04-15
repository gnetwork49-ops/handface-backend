module.exports = {
  env: "production",
  port: process.env.PORT || 3000,
  jwtExpiresIn: "24h",
  corsOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 50
  },
  db: {
    pool: {
      max: 10,
      idleTimeoutMillis: 30000,
      ssl: true
    }
  }
};