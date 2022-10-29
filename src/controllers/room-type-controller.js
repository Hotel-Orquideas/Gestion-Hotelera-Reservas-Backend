const { prisma } = require('./employee-controller');
const { request, response } = require('express');

const createRoomType = async (req = request, res = response) => {
	const { name, numMaxGuests } = req.body;

	const resultRoomType = await prisma.roomType.create({
		data: {
			name,
			numMaxGuests,
		},
	});

	res.json({
		msg: 'Room Type create sucessfull!',
		resultRoomType,
	});
	console.log('Tipo de habitacion creado exitosamente!');
};

const getRoomType = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.roomType.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllRoomTypes = async (req = request, res = response) => {
	const results = await prisma.roomType.findMany({});
	res.json(results);
	console.log(results);
};

const updateRoomType = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.roomType.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Room Type updated sucessfull!',
		result,
	});
};

const deleteRoomType = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.roomType.delete({
		where: { id },
	});
	res.json({
		msg: 'Room Type delete sucessfull!',
		result,
	});
};

module.exports = {
	createRoomType,
	getRoomType,
	getAllRoomTypes,
	updateRoomType,
	deleteRoomType,
	prisma,
};
