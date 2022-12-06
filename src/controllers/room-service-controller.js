const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createRoomService = async (req = request, res = response) => {
	const { quantity, serviceId, bookingRoomBookingId, bookingRoomRoomId } = req.body;
	const result = await prisma.roomService.create({
		data: {
			quantity,
			service: { connect: { id: parseInt(serviceId) } },
			bookingRoom: { connect: { bookingId_roomId: parseInt(bookingRoomBookingId + '' + bookingRoomRoomId) } },
		},
	});
	res.json({
		msg: 'Room service create sucessfull!',
		result,
	});
};

const getRoomServiceById = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.roomService.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllRoomServices = async (req = request, res = response) => {
	//id de reserva
	const id = parseInt(req.params.id);
	const results = await prisma.roomService.findMany({
		where: { bookingRoomBookingId: id },
	});
	res.json(results);
};

const updateRoomService = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.paymentHistory.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Room service updated sucessfull!',
		result,
	});
};

module.exports = {
	createRoomService,
	getRoomServiceById,
	getAllRoomServices,
	updateRoomService,
	prisma,
};
