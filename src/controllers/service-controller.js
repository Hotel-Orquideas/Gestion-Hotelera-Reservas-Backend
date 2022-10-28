const { prisma } = require('./employee-controller');
const { request, response } = require('express');

const createService = async (req = request, res = response) => {
	const { name, pricePerUnit, hotelId } = req.body;

	const resultService = await prisma.service.create({
		data: {
			name,
			pricePerUnit,
			hotel: {
				connect: { id: hotelId },
			},
		},
	});

	res.json({
		msg: 'Service create sucessfull!',
		resultService,
	});
	console.log('Servicio creado exitosamente!');
};

const getService = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.service.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllServices = async (req = request, res = response) => {
	const results = await prisma.service.findMany({});
	res.json(results);
	console.log(results);
};

const updateService = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { hotelId, ...toUpdate } = req.body;

	const result = await prisma.service.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Service updated sucessfull!',
		result,
	});
};

const deleteService = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.service.delete({
		where: { id },
	});
	res.json({
		msg: 'Service delete sucessfull!',
		result,
	});
};

module.exports = {
	createService,
	getService,
	getAllServices,
	updateService,
	deleteService,
	prisma,
};
