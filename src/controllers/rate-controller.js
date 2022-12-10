const { prisma } = require('./employee-controller');
const { request, response } = require('express');

const createRate = async (req = request, res = response) => {
	const { name, value, roomTypeId } = req.body;

	const resultRoomType = await prisma.rate.create({
		data: {
			name,
			value,
			roomType: {
				connect: { id: roomTypeId },
			},
		},
	});

	res.json({
		msg: 'Rate create sucessfull!',
		resultRoomType,
	});
	console.log('Tarifa creada exitosamente!');
};

const getRate = async (req = request, res = response) => {
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
					id: true,
					name: true,
					numMaxGuests: true,
				},
			},
		},
	});
	res.json(result);
};

const getAllRates = async (req = request, res = response) => {
	const results = await prisma.rate.findMany({
		select: {
			id: true,
			name: true,
			value: true,
			roomType: {
				select: {
					id: true,
					name: true,
					numMaxGuests: true,
				},
			},
		},
	});
	res.json(results);
	console.log(results);
};

const updateRate = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

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

const deleteRate = async (req = request, res = response) => {
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
	createRate,
	getRate,
	getAllRates,
	updateRate,
	deleteRate,
	prisma,
};
