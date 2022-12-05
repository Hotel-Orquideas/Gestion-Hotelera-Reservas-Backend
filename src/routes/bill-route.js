const { Router } = require('express');
const { createBill } = require('../controllers/bill-controller');

const router = Router();

router.post('/', createBill);

router.get('/:id');

router.get('/');

router.put('/:id');

router.patch('/:id');

module.exports = router;
