// Remove empty query parameters to prevent invalid queries
export const sanitizeSearchQuery = (req, res, next) => {
  for (const key of Object.keys(req.query)) {
    const value = req.query[key];
    if (value === undefined || value === null || value === "") {
      delete req.query[key];
    }
  }
  next();
};

// Simple rate limiting (placeholder – you can replace with express-rate-limit)
export const rateLimiter = (req, res, next) => {
  // For production, implement a proper rate limiter (e.g., express-rate-limit)
  next();
};
