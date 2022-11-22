const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createClient = async (req = request, res = response) => {
	const {
		name,
		lastName,
		typeDocument,
		document,
		genre,
		birthdate,
		phoneNumber,
		email,
		bloodType,
		dateIssuanceDoc,
		countryOrigin,
		countryDestination,
		cityOrigin,
		cityDestination,
		profession,
	} = req.body;

	const result = await prisma.client.create({
		data: {
			dateIssuanceDoc,
			countryOrigin,
			countryDestination,
			cityOrigin,
			cityDestination,
			profession,
			person: {
				create: {
					name,
					lastName,
					typeDocument,
					document,
					genre,
					birthdate: new Date(birthdate),
					phoneNumber,
					email,
					bloodType,
				},
			},
			hotel: {
				connect: { id: 1 },
			},
		},
		include: { person: true },
	});

	res.json({
		msg: 'CLient create sucessfull!',
		result,
	});
	console.log('Cliente creado exitosamente!');
};

const getClient = async (req = request, res = response) => {
	const document = req.params.doc;
	const result = await prisma.client.findFirst({
		where: {
			person: {
				document,
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
	res.json(result);
};

const getAllClients = async (req = request, res = response) => {
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

const updateClient = async (req = request, res = response) => {
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

const deleteClient = async (req = request, res = response) => {
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
	createClient,
	getClient,
	getAllClients,
	updateClient,
	deleteClient,

	prisma,
};
