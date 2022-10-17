const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/auth-controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/login',
	[check('userName', 'Nombre de usuario inválido').not().isEmpty().isEmail(), check('password', 'La contraseña es obligatoria').not().isEmpty(), validateFields],
	login
);

module.exports = router;
