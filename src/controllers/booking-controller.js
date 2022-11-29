const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createBooking = async (req = request, res = response) => {
	const { checkInDate, checkOutDate, details, hotelId, companyId, clientId } = req.body;
	let result = '';

	if (!(companyId && clientId) || !isNaN(companyId) || !isNaN(clientId)) {
		result = await prisma.booking.create({
			data: {
				checkInDate,
				checkOutDate,
				details,
				hotel: {
					connect: { id: parseInt(hotelId) },
				},
			},
			select: {
				id: true,
			},
		});
	}

	if (!companyId) {
		result = await prisma.booking.create({
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
			select: {
				id: true,
			},
		});
	}

	if (!clientId || !isNaN(clientId)) {
		result = await prisma.booking.create({
			data: {
				checkInDate,
				checkOutDate,
				details,
				hotel: {
					connect: { id: parseInt(hotelId) },
				},
				company: {
					connect: { id: parseInt(companyId) },
				},
			},
			select: {
				id: true,
			},
		});
	}

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

//obtener reservas disponibles
const getBookingsAvailable = async (req = request, res = response) => {
	const { startDate, endDate } = req.body;
	const myBookings = await prisma.booking.findMany({
		where: {
			OR: [
				{
					checkInDate: {
						lte: endDate,
					},
					checkOutDate: {
						gte: startDate,
					},
				},
				{
					checkInDate: {
						gte: startDate,
					},
					checkOutDate: {
						lte: endDate,
					},
				},
			],
			AND: [
				{
					state: 'A',
				},
			],
		},
	});

	const myArray = myBookings.forEach((booking) => {
		myArray.push(booking.id);
	});

	const myBookingRooms = await prisma.bookingRoom.findMany({
		where: {
			bookingId: {
				notIn: [myArray],
			},
		},
	});

	res.json(myBookingRooms);
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
	const id = parseInt(req.params.id);
	const result = await prisma.booking.delete({
		where: { id },
	});
	res.json({
		msg: 'Booking deleted successfull!',
		result,
	});
};

module.exports = {
	createBooking,
	getBooking,
	getAllBookings,
	updateBooking,
	deleteBooking,
	prisma,
};
