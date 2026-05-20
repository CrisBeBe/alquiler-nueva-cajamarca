const { PaymentRequest, Anuncio, User, sequelize } = require('../models');
const AnuncioRepository = require('../repositories/AnuncioRepository');

class PaymentService {
  async createPaymentRequest(userId, data) {
    const { anuncio_id, numero_operacion, monto } = data;
    
    // Si hay un anuncio_id, validar que existe y pertenece al usuario
    if (anuncio_id) {
      const anuncio = await Anuncio.findByPk(anuncio_id);
      if (!anuncio) {
        throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
      }
      if (anuncio.usuario_id !== userId) {
        throw { message: 'No tienes permiso para destacar este anuncio', code: 'UNAUTHORIZED', status: 403 };
      }

      // Verificar si ya hay una solicitud pendiente para este anuncio
      const existingPending = await PaymentRequest.findOne({
        where: { anuncio_id, estado: 'pendiente' }
      });
      if (existingPending) {
        throw { message: 'Ya existe una solicitud de apoyo pendiente para este anuncio', code: 'PENDING_SUPPORT', status: 400 };
      }
    }

    return await PaymentRequest.create({
      usuario_id: userId,
      anuncio_id: anuncio_id || null,
      numero_operacion,
      monto,
      estado: 'pendiente'
    });
  }

  async getPendingPayments() {
    return await PaymentRequest.findAll({
      where: { estado: 'pendiente' },
      include: [
        { model: User, as: 'usuario', attributes: ['id', 'nombre_completo', 'email'] },
        { model: Anuncio, as: 'anuncio', attributes: ['id', 'titulo', 'precio_mensual'] }
      ],
      order: [['fecha_solicitud', 'DESC']]
    });
  }

  async processPayment(paymentId, { estado, motivo_rechazo }) {
    const payment = await PaymentRequest.findByPk(paymentId);
    if (!payment) {
      throw { message: 'Solicitud de apoyo no encontrada', code: 'SUPPORT_NOT_FOUND', status: 404 };
    }

    if (payment.estado !== 'pendiente') {
      throw { message: 'Esta solicitud ya ha sido procesada', code: 'ALREADY_PROCESSED', status: 400 };
    }

    const t = await sequelize.transaction();
    try {
      payment.estado = estado;
      payment.motivo_rechazo = motivo_rechazo;
      payment.fecha_procesamiento = new Date();
      await payment.save({ transaction: t });

      if (estado === 'aprobado') {
        const anuncio = await Anuncio.findByPk(payment.anuncio_id);
        if (anuncio) {
          const now = new Date();
          const fifteenDaysLater = new Date();
          fifteenDaysLater.setDate(now.getDate() + 15);

          anuncio.is_featured = true;
          anuncio.featured_at = now;
          anuncio.featured_until = fifteenDaysLater;
          await anuncio.save({ transaction: t });
        }
      }

      await t.commit();
      return payment;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getUserPayments(userId) {
    return await PaymentRequest.findAll({
      where: { usuario_id: userId },
      include: [{ model: Anuncio, as: 'anuncio', attributes: ['id', 'titulo'] }],
      order: [['fecha_solicitud', 'DESC']]
    });
  }
}

module.exports = new PaymentService();
