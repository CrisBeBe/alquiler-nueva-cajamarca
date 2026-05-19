const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { updateProfileValidator } = require('../validators/userValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/profile', UserController.getProfile);
router.put('/profile', updateProfileValidator, validate, UserController.updateProfile);
router.delete('/account', UserController.deleteAccount);

module.exports = router;
