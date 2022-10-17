const { Router } = require('express');
const { check } = require('express-validator');
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employee-controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/',
	[
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('lastName', 'apellido obligatorio').not().isEmpty(),
		check('typeDocument').isIn(['CC', 'PA', 'TI', 'CE']),
		check('document', 'documento obligatorio').not().isEmpty(),
		check('genre').isIn(['M', 'F', 'O']),
		check('birthdate', 'fecha de nacimiento obligatorio').isDate().not().isEmpty(),
		check('phoneNumber', 'número celular es obligatorio').not().isEmpty(),
		check('email', 'correo electronico no válido').isEmail(),
		check('position', 'cargo obligatorio').not().isEmpty(),
		check('roleSender', 'Rol no válido').isIn(['SuperAdministrador', 'Administrador']),
		validateFields,
	],
	createEmployee
);

router.get('/:doc', getEmployee);

router.get('/', getAllEmployees);

router.put('/:doc', updateEmployee);

router.patch('/:doc', deleteEmployee);

module.exports = router;
