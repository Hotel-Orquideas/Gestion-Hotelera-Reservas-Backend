const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createBooking = async (req = request, res = response) => {
	const { checkInDate, checkOutDate, details, clientId, hotelId } = req.body;

	const result = await prisma.booking.create({
		data: {
			checkInDate,
			checkOutDate,
			details,
			hotel: {
				connect: { id: parseInt(hotelId) },
			},
			client: {
				connect: { id: parseInt(clientId) },
			},
		},
	});

	res.json({
		msg: 'Booking create sucessfull!',
		result,
	});
	console.log('Reserva creada exitosamente!');
};

const getBooking = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.booking.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllBookings = async (req = request, res = response) => {
	const results = await prisma.booking.findMany({
		// where: {
		// 	OR: [
		// 		{
		// 			state: 'A',
		// 		},
		// 		{
		// 			state: 'B',
		// 		},
		// 	],
		// },
	});
	res.json(results);
	console.log(results);
};

const updateBooking = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.booking.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Booking updated sucessfull!',
		result,
	});
};

const deleteBooking = async (req = request, res = response) => {
	//ToDo
};

module.exports = {
	createBooking,
	getBooking,
	getAllBookings,
	updateBooking,
	deleteBooking,
	prisma,
};
