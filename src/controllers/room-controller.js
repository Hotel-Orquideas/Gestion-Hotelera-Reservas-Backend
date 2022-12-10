const { prisma } = require('./employee-controller');
const { request, response } = require('express');

const createRoom = async (req = request, res = response) => {
	const { number, roomTypeId } = req.body;

	const resultRoom = await prisma.room.create({
		data: {
			number,
			roomType: {
				connect: { id: roomTypeId },
			},
			hotel: {
				connect: { id: 1 },
			},
		},
	});

	res.json({
		msg: 'Room create sucessfull!',
		resultRoom,
	});
	console.log('Habitacion creada exitosamente!');
};

const getRoom = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.room.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllRooms = async (req = request, res = response) => {
	const results = await prisma.room.findMany({
		select: {
			id: true,
			number: true,
			state: true,
			roomTypeId:true,
			hotelId: true,
			roomType: {
				select: {
					id: true,
					name: true,
					numMaxGuests: true
				}
			}
		}
	});
	res.json(results);
	console.log(results);
};

const updateRoom = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { hotelId, ...toUpdate } = req.body;

	const result = await prisma.room.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Room updated sucessfull!',
		result,
	});
};

const deleteRoom = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.room.delete({
		where: { id },
	});
	res.json({
		msg: 'Room deleted sucessfull!',
		result,
	});
};

module.exports = {
	createRoom,
	getRoom,
	getAllRooms,
	updateRoom,
	deleteRoom,
	prisma,
};
