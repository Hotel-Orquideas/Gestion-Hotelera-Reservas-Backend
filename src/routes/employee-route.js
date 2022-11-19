const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createEmployee, getEmployee, getAllEmployees, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employee-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/',
	[
		validateJWT,
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('lastName', 'apellido obligatorio').not().isEmpty(),
		check('typeDocument').isIn(['CC', 'PA', 'TI', 'CE']),
		check('document', 'documento obligatorio').not().isEmpty(),
		check('genre').isIn(['M', 'F', 'O']),
		check('birthdate', 'fecha de nacimiento obligatorio').not().isEmpty(),
		check('phoneNumber', 'número celular es obligatorio').not().isEmpty(),
		check('email', 'correo electronico no válido').isEmail(),
		check('position', 'cargo obligatorio').not().isEmpty(),
		check('roleSender', 'Rol no válido').isIn(['super-admin', 'administrador']),
		validateFields,
	],
	createEmployee
);

router.get('/:doc', [validateJWT], getEmployee);

router.get('/filterById/:id', getEmployeeById);

router.get('/', [validateJWT], getAllEmployees);

router.put('/:doc', [validateJWT], updateEmployee);

router.patch('/:doc', [validateJWT], deleteEmployee);

module.exports = router;
