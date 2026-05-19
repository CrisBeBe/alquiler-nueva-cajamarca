const { SystemSetting } = require('../models');

class ConfigService {
  async getSetting(key, defaultValue = null) {
    const setting = await SystemSetting.findOne({ where: { key } });
    return setting ? setting.value : defaultValue;
  }

  async setSetting(key, value) {
    let setting = await SystemSetting.findOne({ where: { key } });
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await SystemSetting.create({ key, value });
    }
    return setting.value;
  }

  async getAllSettings() {
    const settings = await SystemSetting.findAll();
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  }
}

module.exports = new ConfigService();
