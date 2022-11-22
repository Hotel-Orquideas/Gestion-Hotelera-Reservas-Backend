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
	const results = await prisma.client.findMany({
		where: {
			OR: [
				{
					state: 'A',
				},
				{
					state: 'B',
				},
			],
		},
		select: {
			id: true,
			dateIssuanceDoc: true,
			countryOrigin: true,
			countryDestination: true,
			cityOrigin: true,
			cityDestination: true,
			profession: true,
			state: true,
			hotelId: false,
			person: {
				select: {
					id: true,
					name: true,
					lastName: true,
					typeDocument: true,
					document: true,
					genre: true,
					birthdate: true,
					phoneNumber: true,
					email: true,
					bloodType: true,
				},
			},
			hotel: {
				select: {
					name: true,
				},
			},
		},
	});
	res.json(results);
	console.log(results);
};

const updateBooking = async (req = request, res = response) => {
	const document = req.params.doc;
	const { dateIssuanceDoc, countryOrigin, countryDestination, cityOrigin, cityDestination, profession, ...toUpdate } = req.body;
	const client = await prisma.client.findFirst({
		where: {
			person: {
				document,
			},
		},
	});

	const { id } = client;

	const result = await prisma.client.update({
		where: {
			id,
		},
		data: {
			dateIssuanceDoc,
			countryOrigin,
			countryDestination,
			cityOrigin,
			cityDestination,
			profession,
			person: {
				update: toUpdate,
			},
		},
		select: {
			id: true,
			dateIssuanceDoc: true,
			countryOrigin: true,
			countryDestination: true,
			cityOrigin: true,
			cityDestination: true,
			profession: true,
			state: true,
			hotelId: false,
			person: {
				select: {
					id: true,
					name: true,
					lastName: true,
					typeDocument: true,
					document: true,
					genre: true,
					birthdate: true,
					phoneNumber: true,
					email: true,
					bloodType: true,
				},
			},
			hotel: {
				select: {
					name: true,
				},
			},
		},
	});
	res.json({
		msg: 'Client updated sucessfull!',
		result,
	});
};

const deleteBooking = async (req = request, res = response) => {
	const document = req.params.doc;
	const client = await prisma.client.findFirst({
		where: {
			person: {
				document,
			},
		},
	});

	const { id } = client;

	const result = await prisma.client.update({
		where: { id },
		data: {
			state: 'D',
		},
	});
	res.json({
		msg: 'Client delete sucessfull!',
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
