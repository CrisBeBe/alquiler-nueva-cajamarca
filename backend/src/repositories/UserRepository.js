const { User, Anuncio } = require('../models');

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(id, includeProfile = false) {
    const options = {};
    if (includeProfile) {
      options.include = [{
        model: Anuncio,
        as: 'anuncios',
        attributes: ['id', 'titulo', 'precio_mensual', 'estado']
      }];
    }
    return await User.findByPk(id, options);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async update(id, updateData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(updateData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.destroy();
  }

  async countAds(userId) {
    return await Anuncio.count({ where: { usuario_id: userId } });
  }
}

module.exports = new UserRepository();
