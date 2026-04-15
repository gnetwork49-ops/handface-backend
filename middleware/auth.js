const jwt = require("jsonwebtoken");

const AUTH_HEADER_PATTERN = /^Bearer\s+/i;

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header required" });
  }

  if (!AUTH_HEADER_PATTERN.test(authHeader)) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = authHeader.replace(AUTH_HEADER_PATTERN, "");
  
  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};