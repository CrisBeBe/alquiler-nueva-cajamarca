const { PaymentService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class PaymentController {
  async requestPayment(req, res, next) {
    try {
      const userId = req.user.id;
      const payment = await PaymentService.createPaymentRequest(userId, req.body);
      return successResponse(res, payment, 'Solicitud de apoyo enviada correctamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async getPendingPayments(req, res, next) {
    try {
      const payments = await PaymentService.getPendingPayments();
      return successResponse(res, payments, 'Apoyos pendientes obtenidos');
    } catch (error) {
      next(error);
    }
  }

  async processPayment(req, res, next) {
    try {
      const { id } = req.params;
      const { estado, motivo_rechazo } = req.body;
      const payment = await PaymentService.processPayment(id, { estado, motivo_rechazo });
      return successResponse(res, payment, `Registro ${estado === 'aprobado' ? 'verificado' : estado} correctamente`);
    } catch (error) {
      next(error);
    }
  }

  async getMyPayments(req, res, next) {
    try {
      const userId = req.user.id;
      const payments = await PaymentService.getUserPayments(userId);
      return successResponse(res, payments, 'Tus registros de apoyo obtenidos correctamente');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
