const { Router } = require('express');
const { createBillDetail, getBillDetailById, getAllBillDetails, updateBillDetail } = require('../controllers/bill-detail-controller');

const router = Router();

router.post('/:id', createBillDetail);

router.get('/:id', getBillDetailById);

router.get('/all/:id', getAllBillDetails);

router.put('/:id', updateBillDetail);

module.exports = router;
