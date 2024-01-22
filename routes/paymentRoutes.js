const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/make-payment', paymentController.makePayment);
router.post('/getPayments', paymentController.getPaymentsByUserId);
router.get('/getPayments', paymentController.getAllPayments);

router.post('/create', paymentController.create);
router.get('/config', paymentController.config);

module.exports = router;
