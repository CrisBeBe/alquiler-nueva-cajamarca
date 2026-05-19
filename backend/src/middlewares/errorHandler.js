const { errorResponse } = require('../utils/responseHelper');

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler]:', err);

  let statusCode = err.status || 500;
  let message = err.message || 'Error interno del servidor';
  let errorCode = err.code || 'INTERNAL_SERVER_ERROR';

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
    errorCode = 'VALIDATION_ERROR';
  }

  // Handle Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'El archivo es demasiado grande (máx. 5MB)';
    errorCode = 'FILE_TOO_LARGE';
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
    errorCode = 'INVALID_TOKEN';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'El token ha expirado';
    errorCode = 'TOKEN_EXPIRED';
  }

  return errorResponse(res, message, errorCode, statusCode);
};

module.exports = errorHandler;
