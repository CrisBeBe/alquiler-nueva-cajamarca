const { AuthService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      return successResponse(res, result, 'Usuario registrado exitosamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { email, token } = req.body;
      const result = await AuthService.verifyEmail(email, token);
      return successResponse(res, result, 'Correo verificado exitosamente');
    } catch (error) {
      next(error);
    }
  }

  async resendVerificationCode(req, res, next) {
    try {
      const { email } = req.body;
      const result = await AuthService.resendVerificationCode(email);
      return successResponse(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return successResponse(res, result, 'Login exitoso');
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(req, res, next) {
    try {
      const { email } = req.body;
      const result = await AuthService.requestPasswordReset(email);
      return successResponse(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const result = await AuthService.resetPassword(token, password);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req, res, next) {
    try {
      // req.user is attached by authMiddleware
      const user = req.user.toJSON();
      delete user.password_hash;
      return successResponse(res, { user }, 'Token válido');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
