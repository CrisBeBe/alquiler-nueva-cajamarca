const { errorResponse } = require('../utils/responseHelper');

/**
 * Admin Middleware to protect routes that require admin privileges
 * Must be used AFTER authMiddleware
 */
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return errorResponse(res, 'Acceso denegado: Se requieren privilegios de administrador', 'FORBIDDEN', 403);
  }
  next();
};

module.exports = adminMiddleware;
