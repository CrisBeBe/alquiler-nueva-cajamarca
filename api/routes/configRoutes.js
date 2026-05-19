const express = require('express');
const router = express.Router();
const ConfigController = require('../controllers/ConfigController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Public route to get monetization status
router.get('/public', ConfigController.getPublicConfig);

// Admin routes
router.use(authMiddleware, adminMiddleware);

router.get('/all', ConfigController.getAllSettings);
router.put('/update', ConfigController.updateSetting);

module.exports = router;
