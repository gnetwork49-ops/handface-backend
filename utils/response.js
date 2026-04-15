const response = {
  success(res, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
  },

  error(res, message, statusCode = 500) {
    return res.status(statusCode).json({ success: false, message });
  },

  created(res, data) {
    return this.success(res, data, 201);
  },

  notFound(res, message = "Resource not found") {
    return this.error(res, message, 404);
  },

  unauthorized(res, message = "Unauthorized") {
    return this.error(res, message, 401);
  },

  forbidden(res, message = "Forbidden") {
    return this.error(res, message, 403);
  },

  badRequest(res, message = "Bad request") {
    return this.error(res, message, 400);
  }
};

module.exports = response;