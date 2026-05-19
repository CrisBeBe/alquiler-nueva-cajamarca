const UserRepository = require('../repositories/UserRepository');
const AnuncioRepository = require('../repositories/AnuncioRepository');

class UserService {
  async getProfile(userId) {
    const user = await UserRepository.findById(userId, true);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }
    return this._sanitizeUser(user);
  }

  async updateProfile(userId, updateData) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }

    if (updateData.newPassword) {
      if (!updateData.currentPassword) {
        throw { message: 'Debe proporcionar la contraseña actual para cambiarla', code: 'CURRENT_PASSWORD_REQUIRED', status: 400 };
      }
      
      const bcrypt = require('bcrypt');
      const isMatch = await bcrypt.compare(updateData.currentPassword, user.password_hash);
      if (!isMatch) {
        throw { message: 'La contraseña actual es incorrecta', code: 'INVALID_CURRENT_PASSWORD', status: 401 };
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password_hash = await bcrypt.hash(updateData.newPassword, salt);
    }

    // Evitar que se actualice el correo o password directamente por aquí
    delete updateData.email;
    delete updateData.id;
    delete updateData.newPassword;
    delete updateData.currentPassword;

    const updatedUser = await UserRepository.update(userId, updateData);
    return this._sanitizeUser(updatedUser);
  }

  async deleteAccount(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }
    
    // Podríamos hacer un borrado lógico
    await UserRepository.update(userId, { estado: 'inactivo' });
    return { message: 'Cuenta desactivada correctamente' };
  }

  async getUserStats(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { message: 'Usuario no encontrado', code: 'USER_NOT_FOUND', status: 404 };
    }

    const anuncios = await AnuncioRepository.findByUserId(userId);
    const totalAnuncios = anuncios.length;
    const totalVisualizaciones = anuncios.reduce((acc, curr) => acc + (curr.visualizaciones || 0), 0);
    const anunciosActivos = anuncios.filter(a => a.estado === 'activo').length;

    return {
      totalAnuncios,
      totalVisualizaciones,
      anunciosActivos
    };
  }

  _sanitizeUser(user) {
    const sanitized = typeof user.toJSON === 'function' ? user.toJSON() : user;
    delete sanitized.password_hash;
    return sanitized;
  }
}

module.exports = new UserService();
