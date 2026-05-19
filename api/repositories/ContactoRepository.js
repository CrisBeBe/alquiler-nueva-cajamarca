const { ContactoRegistro, Anuncio } = require('../models');

class ContactoRepository {
  async create(contactoData) {
    return await ContactoRegistro.create(contactoData);
  }

  async findByVendedor(vendedorId) {
    return await ContactoRegistro.findAll({
      include: [
        {
          model: Anuncio,
          as: 'anuncio',
          where: { usuario_id: vendedorId },
          attributes: ['titulo']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async checkLastContact(email, anuncioId, timeWindowInHours = 1) {
    const { Op } = require('sequelize');
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - timeWindowInHours);

    return await ContactoRegistro.findOne({
      where: {
        visitante_email: email,
        anuncio_id: anuncioId,
        createdAt: {
          [Op.gt]: cutoffDate
        }
      }
    });
  }
}

module.exports = new ContactoRepository();
