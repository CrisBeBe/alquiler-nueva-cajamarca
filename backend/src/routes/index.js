const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const anuncioRoutes = require('./anuncioRoutes');
const contactoRoutes = require('./contactoRoutes');
const configRoutes = require('./configRoutes');
const paymentRoutes = require('./paymentRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/anuncios', anuncioRoutes);
router.use('/config', configRoutes);
router.use('/payments', paymentRoutes);
router.use('/', contactoRoutes); // Contacto endpoints are /contactos and /vendedor/...

module.exports = router;
