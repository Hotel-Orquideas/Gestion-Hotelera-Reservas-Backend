const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createBooking = async (req = request, res = response) => {
	const { checkInDate, checkOutDate, details, total, description, value, hotelId, companyId, clientId } = req.body;

	if (clientId != '') {
		const booking = await prisma.booking.create({
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

		const billDetail = await prisma.billDetail.create({
			data: {
				description,
				date: new Date(Date.now()).toISOString(),
				value,
				bill: {
					create: {
						date: new Date(Date.now()).toISOString(),
						total,
						balanceDue:total,
						client: { connect: { id: parseInt(clientId) } },
						hotel: { connect: { id: parseInt(hotelId) } },
					},
				},
			},
			select: {
				bill: {
					select: {
						id: true,
						date: true,
						total: true,
						balanceDue: true,
						hotel: { select: { name: true } },
						client: { select: { person: { select: { document: true, name: true, lastName: true } } } },
					},
				},
				description: true,
				date: true,
				value: true,
			},
		});

		res.json({
			msg: 'Booking create sucessfully! - client',
			booking,
			billDetail,
		});
	} else if (companyId != '') {
		const booking = await prisma.booking.create({
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

		const billDetail = await prisma.billDetail.create({
			data: {
				description,
				date: new Date(Date.now()).toISOString(),
				value,
				bill: {
					create: {
						date: new Date(Date.now()).toISOString(),
						total,
						balanceDue,
						company: { connect: { id: parseInt(companyId) } },
						hotel: { connect: { id: parseInt(hotelId) } },
					},
				},
			},
			select: {
				bill: {
					select: {
						id: true,
						date: true,
						total: true,
						balanceDue: true,
						hotel: { select: { name: true } },
						company: { select: { nit: true, name: true, legalAgent: true } },
					},
				},
				description: true,
				date: true,
				value: true,
			},
		});

		res.json({
			msg: 'Booking create sucessfully! - company',
			booking,
			billDetail,
		});
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
		select:{
			company:{
				select:{
					id:true,
					nit:true,
					name:true
				}
			},
			client:{
				select:{
					id:true,
					person:{
						name:true,
						lastName:true,
						document:true,
						phoneNumber:true
					}
				}
			}
		}
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

const updateState = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const state = req.params.state;

	if (state === 'A') {
		const result = await prisma.booking.update({
			where: {
				id,
			},
			data:{
				state:'B'
			}
		});

		res.json({
			msg: 'Booking updated sucessfull!',
			result,
		});
	}else if (state === 'B'){
		const result = await prisma.booking.update({
			where: {
				id,
			},
			data:{
				state:'C'
			}
		});

		res.json({
			msg: 'Booking updated sucessfull!',
			result,
		});
	}
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
	updateState,
	deleteBooking,
	prisma,
};
