const { verifyToken } = require('../utils/tokenHelper');
const { errorResponse } = require('../utils/responseHelper');
const { User } = require('../models');

/**
 * Authentication Middleware to protect routes
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No se proporcionó un token de autenticación', 'UNAUTHORIZED', 401);
    }

    const token = authHeader.split(' ')[1];
    
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return errorResponse(res, 'Token inválido o expirado', 'INVALID_TOKEN', 401);
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return errorResponse(res, 'Usuario no encontrado', 'USER_NOT_FOUND', 404);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Middleware Error]:', error);
    return errorResponse(res, 'Error en la autenticación', 'AUTH_ERROR', 500);
  }
};

module.exports = authMiddleware;
