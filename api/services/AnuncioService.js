const { sequelize, FotoAnuncio } = require('../models');
const AnuncioRepository = require('../repositories/AnuncioRepository');

class AnuncioService {
  async createAnuncio(userId, anuncioData, photos = []) {
    const user = await require('../repositories/UserRepository').findById(userId);
    if (!user || !user.email_verificado) {
      throw { message: 'Debes verificar tu correo electrónico antes de publicar un anuncio', code: 'EMAIL_NOT_VERIFIED', status: 403 };
    }

    const t = await sequelize.transaction();
    try {
      const anuncio = await AnuncioRepository.create({
        ...anuncioData,
        usuario_id: userId,
        visualizaciones: 0,
        estado: 'activo'
      }, t);

      if (photos && photos.length > 0) {
        await AnuncioRepository.addPhotos(anuncio.id, photos, t);
      } else {
        throw { message: 'Se requiere al menos una foto para el anuncio', code: 'PHOTO_REQUIRED', status: 400 };
      }

      await t.commit();
      return await AnuncioRepository.findById(anuncio.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async updateAnuncio(userId, anuncioId, updateData) {
    const anuncio = await AnuncioRepository.findById(anuncioId, false);
    if (!anuncio) {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    if (anuncio.usuario_id !== userId) {
      throw { message: 'No tienes permiso para editar este anuncio', code: 'UNAUTHORIZED', status: 403 };
    }

    return await AnuncioRepository.update(anuncioId, updateData);
  }

  async deleteAnuncio(userId, anuncioId) {
    const anuncio = await AnuncioRepository.findById(anuncioId, false);
    if (!anuncio) {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    if (anuncio.usuario_id !== userId) {
      throw { message: 'No tienes permiso para eliminar este anuncio', code: 'UNAUTHORIZED', status: 403 };
    }

    return await AnuncioRepository.delete(anuncioId);
  }

  async getAnuncio(id, incrementView = false) {
    const anuncio = await AnuncioRepository.findById(id);
    if (!anuncio || anuncio.estado === 'eliminado') {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    if (incrementView) {
      await AnuncioRepository.incrementViews(id);
    }

    return anuncio;
  }

  async searchAnuncios(filters, pagination) {
    const limit = parseInt(pagination.limit) || 10;
    const page = parseInt(pagination.page) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await AnuncioRepository.findAll(filters, { limit, offset });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      anuncios: rows
    };
  }

  async changeStatus(userId, anuncioId, status) {
    const validStatuses = ['activo', 'pausado'];
    if (!validStatuses.includes(status)) {
      throw { message: 'Estado no válido', code: 'INVALID_STATUS', status: 400 };
    }

    const anuncio = await AnuncioRepository.findById(anuncioId, false);
    if (!anuncio) {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    if (anuncio.usuario_id !== userId) {
      throw { message: 'No tienes permiso para modificar este anuncio', code: 'UNAUTHORIZED', status: 403 };
    }

    return await AnuncioRepository.update(anuncioId, { estado: status });
  }

  async managePhotos(userId, anuncioId, actions) {
    // actions: { add: [], remove: [ids], reorder: [{id, order}] }
    const anuncio = await AnuncioRepository.findById(anuncioId);
    if (!anuncio) {
      throw { message: 'Anuncio no encontrado', code: 'ANUNCIO_NOT_FOUND', status: 404 };
    }

    if (anuncio.usuario_id !== userId) {
      throw { message: 'No tienes permiso para modificar este anuncio', code: 'UNAUTHORIZED', status: 403 };
    }

    const t = await sequelize.transaction();
    try {
      if (actions.remove && actions.remove.length > 0) {
        const remainingCount = anuncio.fotos.length - actions.remove.length + (actions.add ? actions.add.length : 0);
        if (remainingCount < 1) {
          throw { message: 'El anuncio debe tener al menos una foto', code: 'MIN_PHOTO_REQUIRED', status: 400 };
        }
        for (const photoId of actions.remove) {
          await AnuncioRepository.removePhoto(photoId, t);
        }
      }

      if (actions.add && actions.add.length > 0) {
        await AnuncioRepository.addPhotos(anuncioId, actions.add, t);
      }

      if (actions.reorder && actions.reorder.length > 0) {
        for (const item of actions.reorder) {
          await AnuncioRepository.updatePhoto(item.id, { orden_presentacion: item.order }, t);
        }
      }

      await t.commit();
      return await AnuncioRepository.findById(anuncioId);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getSellerAnuncios(userId) {
    return await AnuncioRepository.findByUserId(userId);
  }
}

module.exports = new AnuncioService();
