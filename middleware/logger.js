const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString()
    };

    if (process.env.LOG_LEVEL === "debug") {
      console.debug(log);
    } else {
      console.log(`${log.method} ${log.url} ${log.status} ${log.duration}`);
    }
  });

  next();
};

module.exports = logger;