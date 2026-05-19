const { sequelize, User, Anuncio, FotoAnuncio } = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  try {
    // Sync database (be careful, this might drop tables if you use {force: true})
    // For seeding we usually assume tables exist or we use sync()
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Create a sample user
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await User.create({
      id: uuidv4(),
      email: 'cabreracristhian662@gmail.com',
      password_hash: passwordHash,
      nombre_completo: 'Cristhian Cabrera',
      telefono: '916225416',
      estado: 'activo',
      role: 'admin',
      email_verificado: true
    });
    console.log('Admin user created (Cristhian Cabrera).');

    // Create initial system settings
    const { SystemSetting } = require('../models');
    await SystemSetting.create({
      key: 'modoSolidario',
      value: false
    });
    console.log('Initial system settings created.');

    // Create some sample ads
    const anuncios = [
      {
        id: uuidv4(),
        usuario_id: user.id,
        tipo: 'cuarto',
        titulo: 'Cuarto espacioso cerca de la plaza',
        descripcion: 'Se alquila cuarto con baño propio, entrada independiente y luz natural.',
        precio_mensual: 250.00,
        direccion: 'Av. Principal 123',
        zona: 'Centro',
        amenidades: ['WiFi', 'Baño propio', 'Entrada independiente'],
        metodo_contacto: 'whatsapp',
        numero_contacto: '987654321',
        estado: 'activo'
      },
      {
        id: uuidv4(),
        usuario_id: user.id,
        tipo: 'casa',
        titulo: 'Casa familiar 3 habitaciones',
        descripcion: 'Hermosa casa ideal para familias, con cochera y jardín trasero.',
        precio_mensual: 800.00,
        direccion: 'Calle Los Cedros 456',
        zona: 'Residencial',
        amenidades: ['Cochera', 'Jardín', '3 Habitaciones', 'Cocina equipada'],
        metodo_contacto: 'multicanal',
        numero_contacto: '987654321',
        correo_contacto: 'admin@alquileresnc.com',
        estado: 'activo'
      },
      {
        id: uuidv4(),
        usuario_id: user.id,
        tipo: 'cuarto',
        titulo: 'Mini-departamento amoblado',
        descripcion: 'Ideal para estudiantes o personas solas. Incluye cama, closet y mesa.',
        precio_mensual: 400.00,
        direccion: 'Jr. Comercio 789',
        zona: 'Norte',
        amenidades: ['Amoblado', 'Luz y Agua incluidos', 'Lavandería compartida'],
        metodo_contacto: 'telefono',
        telefono_contacto: '987654321',
        estado: 'activo'
      }
    ];

    const createdAnuncios = await Anuncio.bulkCreate(anuncios);
    console.log('Sample ads created.');

    // Add some sample photos
    const photos = [];
    createdAnuncios.forEach(anuncio => {
      photos.push({
        id: uuidv4(),
        anuncio_id: anuncio.id,
        url_foto: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        orden_presentacion: 0
      });
    });

    await FotoAnuncio.bulkCreate(photos);
    console.log('Sample photos added.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
