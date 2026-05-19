const express = require('express');
const router = express.Router();
const AnuncioController = require('../controllers/AnuncioController');
const { createAnuncioValidator, updateAnuncioValidator, statusAnuncioValidator } = require('../validators/anuncioValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', AnuncioController.getAll);
router.get('/buscar', AnuncioController.search);
router.get('/:id', AnuncioController.getById);

// Protected routes
router.use(authMiddleware);

router.post('/', uploadMiddleware.array('fotos', 10), createAnuncioValidator, validate, AnuncioController.create);
router.get('/vendedor/mis-anuncios', AnuncioController.getSellerAnuncios);

router.put('/:id', updateAnuncioValidator, validate, AnuncioController.update);
router.delete('/:id', AnuncioController.delete);
router.patch('/:id/status', statusAnuncioValidator, validate, AnuncioController.changeStatus);

// Photo management
router.post('/:id/fotos', uploadMiddleware.array('fotos', 10), AnuncioController.uploadPhotos);
router.put('/:id/fotos/reorder', AnuncioController.reorderPhotos);
router.delete('/:id/fotos/:fotoId', AnuncioController.deletePhoto);

module.exports = router;
