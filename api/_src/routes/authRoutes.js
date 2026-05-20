const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { registerValidator, loginValidator, requestResetValidator, confirmResetValidator } = require('../validators/authValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registro', registerValidator, validate, AuthController.register);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/resend-verification', AuthController.resendVerificationCode);
router.post('/login', loginValidator, validate, AuthController.login);
router.post('/reset-password/solicitar', requestResetValidator, validate, AuthController.requestPasswordReset);
router.post('/reset-password/confirmar', confirmResetValidator, validate, AuthController.resetPassword);
router.get('/verify-token', authMiddleware, AuthController.verifyToken);

module.exports = router;
