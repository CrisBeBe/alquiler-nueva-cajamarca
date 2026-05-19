const { AnuncioService } = require('../services');
const { successResponse } = require('../utils/responseHelper');

class AnuncioController {
  async getAll(req, res, next) {
    try {
      const { page, limit, ...filters } = req.query;
      const result = await AnuncioService.searchAnuncios(filters, { page, limit });
      return successResponse(res, result, 'Anuncios obtenidos correctamente');
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      // Search might be similar to getAll but with specific search filters
      const { page, limit, ...filters } = req.query;
      const result = await AnuncioService.searchAnuncios(filters, { page, limit });
      return successResponse(res, result, 'Resultados de búsqueda');
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const anuncio = await AnuncioService.getAnuncio(id, true);
      return successResponse(res, anuncio, 'Detalle del anuncio');
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Parse amenidades if it's a string (from FormData)
      if (typeof data.amenidades === 'string') {
        try {
          data.amenidades = JSON.parse(data.amenidades);
        } catch (e) {
          data.amenidades = data.amenidades.split(',').map(item => item.trim());
        }
      }

      // photos are expected from uploadMiddleware (local paths)
      const localPhotos = req.files ? req.files.map(file => file.path) : [];
      
      // Upload to Cloudinary
      const { uploadToCloudinary } = require('../config/cloudinary');
      const uploadedPhotos = [];
      
      for (const localPath of localPhotos) {
        const uploadResult = await uploadToCloudinary(localPath);
        uploadedPhotos.push(uploadResult.secure_url);
      }

      const anuncio = await AnuncioService.createAnuncio(userId, data, uploadedPhotos);
      return successResponse(res, anuncio, 'Anuncio creado exitosamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const data = { ...req.body };
      delete data.fotos;
      delete data.fotosFiles;

      // Parse amenidades if it's a string
      if (typeof data.amenidades === 'string') {
        try {
          data.amenidades = JSON.parse(data.amenidades);
        } catch (e) {
          data.amenidades = data.amenidades.split(',').map(item => item.trim());
        }
      }

      const anuncio = await AnuncioService.updateAnuncio(userId, id, data);
      return successResponse(res, anuncio, 'Anuncio actualizado correctamente');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      await AnuncioService.deleteAnuncio(userId, id);
      return successResponse(res, null, 'Anuncio eliminado correctamente');
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { status } = req.body;
      const anuncio = await AnuncioService.changeStatus(userId, id, status);
      return successResponse(res, anuncio, 'Estado del anuncio actualizado');
    } catch (error) {
      next(error);
    }
  }

  async getSellerAnuncios(req, res, next) {
    try {
      const userId = req.user.id;
      const anuncios = await AnuncioService.getSellerAnuncios(userId);
      return successResponse(res, anuncios, 'Tus anuncios obtenidos correctamente');
    } catch (error) {
      next(error);
    }
  }

  async uploadPhotos(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const localPhotos = req.files ? req.files.map(file => file.path) : [];
      
      if (localPhotos.length === 0) {
        throw { message: 'No se subieron fotos', code: 'NO_PHOTOS', status: 400 };
      }

      // Upload to Cloudinary
      const { uploadToCloudinary } = require('../config/cloudinary');
      const uploadedPhotos = [];
      
      for (const localPath of localPhotos) {
        const uploadResult = await uploadToCloudinary(localPath);
        uploadedPhotos.push(uploadResult.secure_url);
      }

      const anuncio = await AnuncioService.managePhotos(userId, id, { add: uploadedPhotos });
      return successResponse(res, anuncio, 'Fotos subidas correctamente');
    } catch (error) {
      next(error);
    }
  }

  async reorderPhotos(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { reorder } = req.body; // Array of {id, order}
      
      const anuncio = await AnuncioService.managePhotos(userId, id, { reorder });
      return successResponse(res, anuncio, 'Fotos reordenadas correctamente');
    } catch (error) {
      next(error);
    }
  }

  async deletePhoto(req, res, next) {
    try {
      const userId = req.user.id;
      const { id, fotoId } = req.params;
      
      const anuncio = await AnuncioService.managePhotos(userId, id, { remove: [fotoId] });
      return successResponse(res, anuncio, 'Foto eliminada correctamente');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AnuncioController();
