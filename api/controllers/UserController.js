const { UserService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class UserController {
  async getProfile(req, res, next) {
    try {
      const profile = await UserService.getProfile(req.user.id);
      return successResponse(res, profile, 'Perfil obtenido correctamente');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updatedProfile = await UserService.updateProfile(req.user.id, req.body);
      return successResponse(res, updatedProfile, 'Perfil actualizado correctamente');
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const result = await UserService.deleteAccount(req.user.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
