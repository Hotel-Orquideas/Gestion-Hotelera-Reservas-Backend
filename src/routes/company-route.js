const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createCompany, getCompany, getAllCompanies, updateCompany, deleteCompany } = require('../controllers/company-controller');

const router = Router();

router.post(
	'/',
	[
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('nit', 'NIT no válido').not().isEmpty(),
		check('email', 'correo electronico no válido').isEmail(),
		check('phoneNumber', 'número celular es obligatorio').not().isEmpty(),
		check('legalAgent', 'representante legal es obligatorio').not().isEmpty(),
		validateFields,
	],
	createCompany
);

router.get('/:nit', getCompany);

router.get('/', getAllCompanies);

router.put('/:nit', updateCompany);

router.patch('/:nit', deleteCompany);

module.exports = router;
