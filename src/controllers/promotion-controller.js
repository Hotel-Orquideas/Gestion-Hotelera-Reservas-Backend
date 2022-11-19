const { prisma } = require('./employee-controller');
const { request, response } = require('express');

const createPromotion = async (req = request, res = response) => {
	const { description, percentage, expirationDate, companyId } = req.body;

	const resultPromotion = await prisma.promotion.create({
		data: {
			description,
			percentage,
			expirationDate,
			company: {
				connect: { id: companyId },
			},
		},
	});

	res.json({
		msg: 'Promotion created sucessfull!',
		resultPromotion,
	});
	console.log('Promocion creada exitosamente!');
};

const getPromotion = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.promotion.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllPromotions = async (req = request, res = response) => {
	const results = await prisma.promotion.findMany({});
	res.json(results);
	console.log(results);
};

const updatePromotion = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { companyId, ...toUpdate } = req.body;

	const result = await prisma.promotion.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Promotion updated sucessfull!',
		result,
	});
};

const deletePromotion = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.promotion.delete({
		where: { id },
	});
	res.json({
		msg: 'Promotion delete sucessfull!',
		result,
	});
};

module.exports = {
	createPromotion,
	getPromotion,
	getAllPromotions,
	updatePromotion,
	deletePromotion,
	prisma,
};
