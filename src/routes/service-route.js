const { Router } = require('express');
const { check } = require('express-validator');
const { createService, getService, getAllServices, updateService, deleteService } = require('../controllers/service-controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/',
	[
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('pricePerUnit', 'Precio por unidad obligatorio!').not().isEmpty(),
		check('hotelId', 'identificador del hotel obligatorio!').not().isEmpty(),
		validateFields,
	],
	createService
);

router.get('/:id', getService);

router.get('/', getAllServices);

router.put('/:id', updateService);

router.patch('/:id', deleteService);

module.exports = router;
