const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createBill = async (req = request, res = response) => {
	const { total, balanceDue, companyId, clientId } = req.body;
	console.log(companyId);
	if (companyId != '') {
		const result = await prisma.bill.create({
			data: {
				date: new Date(Date.now()).toISOString(),
				total,
				balanceDue,
				company: {
					connect: {
						id: parseInt(companyId),
					},
				},
				hotel: {
					connect: {
						id: 1,
					},
				},
			},
		});
		res.json({
			msg: 'Bill create sucessfull! - company',
			result,
		});
		console.log('Factura creada exitosamente!');
	} else if (clientId != '') {
		const result = await prisma.bill.create({
			data: {
				date: new Date(Date.now()).toISOString(),
				total,
				balanceDue,
				client: {
					connect: {
						id: parseInt(clientId),
					},
				},
				hotel: {
					connect: {
						id: 1,
					},
				},
			},
		});
		res.json({
			msg: 'Bill create sucessfull! - client',
			result,
		});
		console.log('Factura creada exitosamente!');
	}
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
	createBill,
	prisma,
};
