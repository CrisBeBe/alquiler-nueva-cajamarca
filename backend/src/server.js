const app = require('./app');
const { sequelize } = require('./models');
const cronService = require('./services/cronService');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Manually add columns if they don't exist
    try {
      await sequelize.query('ALTER TABLE "anuncios" ADD COLUMN IF NOT EXISTS "featured_at" TIMESTAMP;');
      await sequelize.query('ALTER TABLE "anuncios" ADD COLUMN IF NOT EXISTS "featured_until" TIMESTAMP;');
      // Permitir null en anuncio_id para apoyos generales
      await sequelize.query('ALTER TABLE "pagos_solicitudes" ALTER COLUMN "anuncio_id" DROP NOT NULL;');
    } catch (e) {
      console.log('Database schema updates check finished');
    }

    // In production, we usually don't sync here but use migrations
    // For development, we enable sync:
    await sequelize.sync();
    console.log('Database synced successfully.');

    // Start background tasks
    cronService.start();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
