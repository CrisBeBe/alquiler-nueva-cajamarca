const express = require('express');
const cors = require('cors');
require('pg'); // Required for Vercel to include the pg module for Sequelize

const routes = require('./_src/routes');
const errorHandler = require('./_src/middlewares/errorHandler');
const { sequelize } = require('./_src/models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Sync for Serverless (only in production/Vercel)
if (process.env.NODE_ENV === 'production') {
  sequelize.sync()
    .then(async () => {
      console.log('Database synced in serverless mode');
      // Manual schema updates
      try {
        await sequelize.query('ALTER TABLE "anuncios" ADD COLUMN IF NOT EXISTS "featured_at" TIMESTAMP;');
        await sequelize.query('ALTER TABLE "anuncios" ADD COLUMN IF NOT EXISTS "featured_until" TIMESTAMP;');
        await sequelize.query('ALTER TABLE "pagos_solicitudes" ALTER COLUMN "anuncio_id" DROP NOT NULL;');
      } catch (e) {
        console.log('Schema updates skipped or failed');
      }

      // Create admin user if it doesn't exist
      try {
        const { User } = require('./_src/models');
        const adminEmail = 'cabreracristhian662@gmail.com';
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });
        
        if (!existingAdmin) {
          const bcrypt = require('bcryptjs');
          const passwordHash = await bcrypt.hash('admin2026_secure', 10);
          await User.create({
            email: adminEmail,
            password_hash: passwordHash,
            nombre_completo: 'Cristhian Cabrera',
            telefono: '916225416',
            role: 'admin',
            email_verificado: true,
            estado: 'activo'
          });
          console.log('Admin user created successfully');
        }
      } catch (adminErr) {
        console.error('Error creating default admin:', adminErr);
      }
    })
    .catch(err => console.error('Database sync error:', err));
}

// Health check
app.get(['/api/health', '/health'], async (req, res) => {
  try {
    await sequelize.authenticate();
    const { User } = require('./_src/models');
    const userCount = await User.count();
    const adminUser = await User.findOne({ where: { email: 'cabreracristhian662@gmail.com' } });
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'Backend is up and Database is connected',
      database: 'connected',
      stats: {
        totalUsers: userCount,
        adminExists: !!adminUser,
        adminRole: adminUser ? adminUser.role : null,
        adminVerified: adminUser ? adminUser.email_verificado : null
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      message: 'Backend is up but Database connection failed',
      error: error.message
    });
  }
});

app.use('/api', routes);
app.use('/', routes); // Fallback for when /api is stripped by Vercel

app.use(errorHandler);

module.exports = app;
