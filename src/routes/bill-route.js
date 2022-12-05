const { Router } = require('express');
const { getBillById, getAllBills, updateBill, updateState } = require('../controllers/bill-controller');

const router = Router();

router.get('/:id', getBillById);

router.get('/', getAllBills);

router.put('/:id', updateBill);

router.put('/state/:id', updateState);

module.exports = router;
