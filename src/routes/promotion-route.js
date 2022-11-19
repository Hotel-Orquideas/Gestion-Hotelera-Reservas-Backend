const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
	createPromotion,
	getPromotion,
	getAllPromotions,
	updatePromotion,
	deletePromotion,
	getPromotionByCompany,
} = require('../controllers/promotion-controller');

const router = Router();

router.post(
	'/',
	[
		//validateJWT,
		check('description', 'descripción obligatoria').not().isEmpty(),
		check('percentage', 'porcentaje obligatorio').not().isEmpty(),
		check('expirationDate', 'fecha de vencimiento obligatorio').not().isEmpty(),
		check('companyId', 'identificador de la empresa obligatorio').not().isEmpty(),
		validateFields,
	],
	createPromotion
);

router.get('/:id', getPromotion);

router.get('/', getAllPromotions);

router.get('/byCompany/:id', getPromotionByCompany);

router.put('/:id', updatePromotion);

router.delete('/:id', deletePromotion);

module.exports = router;
