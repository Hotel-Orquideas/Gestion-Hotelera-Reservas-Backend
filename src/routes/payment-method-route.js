const { Router } = require('express');
const { createPaymentMethod, getPaymentMethod, getAllPaymentMethods } = require('../controllers/payment-method-controller');

const router = Router();

router.post('/', createPaymentMethod);

router.get('/:id', getPaymentMethod);

router.get('/', getAllPaymentMethods);

module.exports = router;
