const { Router } = require('express');
const { check } = require('express-validator');
const { createRate, getRate, getAllRates, updateRate, deleteRate } = require('../controllers/rate-controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/',
	[
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('value', 'valor obligatorio').not().isEmpty().isNumeric(),
		check('roomTypeId', 'identificador del tipo de habitación obligatorio').not().isEmpty(),
		validateFields,
	],
	createRate
);

router.get('/:id', getRate);

router.get('/', getAllRates);

router.put('/:id', updateRate);

router.delete('/:id', deleteRate);

module.exports = router;
