const { Router } = require('express');
const { check } = require('express-validator');
const { createClient, getClient, getAllClients, updateClient, deleteClient } = require('../controllers/client-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/',
	[
		//validateJWT,
		check('name', 'nombre obligatorio').not().isEmpty(),
		check('lastName', 'apellido obligatorio').not().isEmpty(),
		check('typeDocument').isIn(['CC', 'PA', 'TI', 'CE']),
		check('document', 'documento obligatorio').not().isEmpty(),
		check('genre').isIn(['M', 'F', 'O']),
		check('birthdate', 'fecha de nacimiento obligatorio').not().isEmpty(),
		check('phoneNumber', 'número celular es obligatorio').not().isEmpty(),
		check('email', 'correo electronico no válido').isEmail(),
		check('dateIssuanceDoc', 'fecha de expedición del documento obligatorio').not().isEmpty(),
		check('countryOrigin', 'Pais de origen obligatorio').not().isEmpty(),
		check('countryDestination', 'Pais de destino obligatorio').not().isEmpty(),
		check('cityOrigin', 'Ciudad de origen obligatorio').not().isEmpty(),
		check('cityDestination', 'Ciudad de origeno obligatorio').not().isEmpty(),
		check('profession', 'profesion u oficio obligatorio').not().isEmpty(),
		//check('roleSender', 'Rol no válido').isIn(['super-admin', 'administrador']),
		validateFields,
	],
	createClient
);

router.get(
	'/:doc',
	//[validateJWT],
	getClient
);

router.get(
	'/',
	//[validateJWT],
	getAllClients
);

router.put('/:doc', [validateJWT], updateClient);

router.patch('/:doc', [validateJWT], deleteClient);

module.exports = router;
