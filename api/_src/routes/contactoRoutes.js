const express = require('express');
const router = express.Router();
const ContactoController = require('../controllers/ContactoController');
const { createContactoValidator } = require('../validators/contactoValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/contactos', createContactoValidator, validate, ContactoController.register);

// Seller history and stats
router.get('/vendedor/contactos', authMiddleware, ContactoController.getVendedorContactos);
router.get('/vendedor/estadisticas', authMiddleware, ContactoController.getVendedorStats);

module.exports = router;
