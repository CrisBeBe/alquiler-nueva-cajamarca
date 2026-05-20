const { ConfigService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class ConfigController {
  async getPublicConfig(req, res, next) {
    try {
      const modoSolidario = await ConfigService.getSetting('modoSolidario', false);
      return successResponse(res, { modoSolidario }, 'Configuración obtenida');
    } catch (error) {
      next(error);
    }
  }

  async getAllSettings(req, res, next) {
    try {
      const settings = await ConfigService.getAllSettings();
      return successResponse(res, settings, 'Ajustes del sistema obtenidos');
    } catch (error) {
      next(error);
    }
  }

  async updateSetting(req, res, next) {
    try {
      const { key, value } = req.body;
      const updatedValue = await ConfigService.setSetting(key, value);
      return successResponse(res, { [key]: updatedValue }, 'Ajuste actualizado correctamente');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConfigController();
