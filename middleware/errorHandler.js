const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Resource already exists"
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference"
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Server error" : err.message
  });
};

module.exports = errorHandler;