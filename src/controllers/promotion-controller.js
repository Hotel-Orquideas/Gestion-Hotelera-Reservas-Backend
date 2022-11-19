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
	const result = await prisma.rate.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			value: true,
			roomType: {
				select: {
					id: false,
					name: true,
					numMaxGuests: true,
				},
			},
		},
	});
	res.json(result);
};

const getAllPromotions = async (req = request, res = response) => {
	const results = await prisma.rate.findMany({
		select: {
			id: true,
			name: true,
			value: true,
			roomType: {
				select: {
					id: false,
					name: true,
					numMaxGuests: true,
				},
			},
		},
	});
	res.json(results);
	console.log(results);
};

const updatePromotion = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { roomTypeId, ...toUpdate } = req.body;

	const result = await prisma.rate.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Rate updated sucessfull!',
		result,
	});
};

const deletePromotion = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.rate.delete({
		where: { id },
	});
	res.json({
		msg: 'Rate delete sucessfull!',
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
