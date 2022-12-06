const { Router } = require('express');
const { createPaymentHistory, getPaymentHistoryById, getAllPaymentHistories, updatePaymentHistory } = require('../controllers/payment-history-controller');

const router = Router();

router.post('/:id', createPaymentHistory);

router.get('/:id', getPaymentHistoryById);

router.get('/all/:id', getAllPaymentHistories);

router.put('/:id', updatePaymentHistory);

module.exports = router;
