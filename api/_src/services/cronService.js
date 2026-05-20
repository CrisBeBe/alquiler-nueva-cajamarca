const { Anuncio } = require('../models');
const { Op } = require('sequelize');

class CronService {
  /**
   * Cleans up expired featured ads.
   * Resets is_featured to false if featured_until has passed.
   */
  async cleanupExpiredFeaturedAds() {
    try {
      const now = new Date();
      const [updatedCount] = await Anuncio.update(
        { 
          is_featured: false,
          featured_at: null,
          featured_until: null
        },
        {
          where: {
            is_featured: true,
            featured_until: {
              [Op.lt]: now
            }
          }
        }
      );
      
      if (updatedCount > 0) {
        console.log(`[CRON] Se han expirado ${updatedCount} anuncios destacados.`);
      }
    } catch (error) {
      console.error('[CRON ERROR] Error al limpiar anuncios expirados:', error);
    }
  }

  /**
   * Starts the cron tasks.
   * In a simple setup, we can use setInterval. 
   * For more complex needs, a library like 'node-cron' would be better.
   */
  start() {
    console.log('[CRON] Tareas automáticas iniciadas.');
    
    // Check every hour (3600000 ms)
    setInterval(() => {
      this.cleanupExpiredFeaturedAds();
    }, 3600000);

    // Run once at start
    this.cleanupExpiredFeaturedAds();
  }
}

module.exports = new CronService();
