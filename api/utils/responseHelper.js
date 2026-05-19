/**
 * Standard Success Response
 * @param {Object} res - Express response object
 * @param {any} data - Data to send in the response
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
const successResponse = (res, data = null, message = 'Operación exitosa', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Standard Error Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {string} errorCode - Custom error code
 * @param {number} statusCode - HTTP status code (default 400)
 */
const errorResponse = (res, message = 'Error en la operación', errorCode = 'INTERNAL_ERROR', statusCode = 400) => {
  return res.status(statusCode).json({
    error: message,
    code: errorCode
  });
};

module.exports = {
  successResponse,
  errorResponse
};
