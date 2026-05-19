const { Op } = require('sequelize');
const { Anuncio, User, FotoAnuncio } = require('../models');

class AnuncioRepository {
  async create(anuncioData, transaction = null) {
    return await Anuncio.create(anuncioData, { transaction });
  }

  async findById(id, includeRelations = true) {
    const options = {};
    if (includeRelations) {
      options.include = [
        { model: User, as: 'usuario', attributes: ['id', 'nombre_completo', 'email', 'telefono', 'foto_perfil_url'] },
        { model: FotoAnuncio, as: 'fotos', attributes: ['id', 'url_foto', 'orden_presentacion'] }
      ];
      options.order = [
        [{ model: FotoAnuncio, as: 'fotos' }, 'orden_presentacion', 'ASC']
      ];
    }
    return await Anuncio.findByPk(id, options);
  }

  async findAll(filters = {}, pagination = { limit: 10, offset: 0 }) {
    const { tipo, precioMin, precioMax, zona, text } = filters;
    const where = { estado: 'activo' };

    if (tipo) where.tipo = tipo;
    if (zona) where.zona = { [Op.iLike]: `%${zona}%` };
    if (precioMin || precioMax) {
      where.precio_mensual = {};
      if (precioMin) where.precio_mensual[Op.gte] = precioMin;
      if (precioMax) where.precio_mensual[Op.lte] = precioMax;
    }
    if (text) {
      where[Op.or] = [
        { titulo: { [Op.iLike]: `%${text}%` } },
        { descripcion: { [Op.iLike]: `%${text}%` } }
      ];
    }

    return await Anuncio.findAndCountAll({
      where,
      limit: pagination.limit,
      offset: pagination.offset,
      include: [
        { model: FotoAnuncio, as: 'fotos', attributes: ['id', 'url_foto', 'orden_presentacion'] }
      ],
      order: [
        ['is_featured', 'DESC'],
        ['fecha_publicacion', 'DESC'],
        [{ model: FotoAnuncio, as: 'fotos' }, 'orden_presentacion', 'ASC']
      ],
      distinct: true
    });
  }

  async update(id, updateData, transaction = null) {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio) return null;
    return await anuncio.update(updateData, { transaction });
  }

  async delete(id, transaction = null) {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio) return null;
    return await anuncio.update({ estado: 'eliminado' }, { transaction });
  }

  async incrementViews(id) {
    return await Anuncio.increment('visualizaciones', { where: { id } });
  }

  async findByUserId(userId) {
    return await Anuncio.findAll({
      where: { usuario_id: userId, estado: { [Op.ne]: 'eliminado' } },
      include: [
        { model: FotoAnuncio, as: 'fotos', attributes: ['id', 'url_foto', 'orden_presentacion'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async addPhotos(anuncioId, photoUrls, transaction = null) {
    const photosData = photoUrls.map((url, index) => ({
      url_foto: url,
      orden_presentacion: index,
      anuncio_id: anuncioId
    }));
    return await FotoAnuncio.bulkCreate(photosData, { transaction });
  }

  async removePhoto(photoId, transaction = null) {
    return await FotoAnuncio.destroy({ where: { id: photoId }, transaction });
  }

  async updatePhoto(photoId, updateData, transaction = null) {
    return await FotoAnuncio.update(updateData, { where: { id: photoId }, transaction });
  }

  async countByUserId(userId) {
    return await Anuncio.count({ where: { usuario_id: userId, estado: { [Op.ne]: 'eliminado' } } });
  }
}

module.exports = new AnuncioRepository();
