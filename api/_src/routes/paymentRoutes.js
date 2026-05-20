const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Protected routes (for all logged in users)
router.use(authMiddleware);

router.post('/request', PaymentController.requestPayment);
router.get('/my-payments', PaymentController.getMyPayments);

// Admin routes
router.get('/pending', adminMiddleware, PaymentController.getPendingPayments);
router.put('/:id/process', adminMiddleware, PaymentController.processPayment);

module.exports = router;
