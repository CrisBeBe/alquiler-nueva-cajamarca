const { ContactoService, UserService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class ContactoController {
  async register(req, res, next) {
    try {
      const contacto = await ContactoService.registerContacto(req.body);
      return successResponse(res, contacto, 'Contacto registrado exitosamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async getVendedorContactos(req, res, next) {
    try {
      const userId = req.user.id;
      const contactos = await ContactoService.getVendedorContactos(userId);
      return successResponse(res, contactos, 'Historial de contactos obtenido');
    } catch (error) {
      next(error);
    }
  }

  async getVendedorStats(req, res, next) {
    try {
      const userId = req.user.id;
      const stats = await UserService.getUserStats(userId);
      return successResponse(res, stats, 'Estadísticas del vendedor obtenidas');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactoController();
