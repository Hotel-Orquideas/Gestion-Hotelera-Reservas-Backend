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
	const results = await prisma.employee.findMany({
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
			position: true,
			state: true,
			roleId: false,
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
			role: {
				select: {
					name: true,
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
	const { position, ...toUpdate } = req.body;
	const employee = await prisma.employee.findFirst({
		where: {
			person: {
				document,
			},
		},
	});

	const { id } = employee;

	const result = await prisma.employee.update({
		where: {
			id,
		},
		data: {
			position,
			person: {
				update: toUpdate,
			},
		},
		select: {
			id: true,
			position: true,
			state: true,
			roleId: false,
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
			role: {
				select: {
					name: true,
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
		msg: 'Employee updated sucessfull!',
		result,
	});
};

const deleteClient = async (req = request, res = response) => {
	const document = req.params.doc;
	const employee = await prisma.employee.findFirst({
		where: {
			person: {
				document,
			},
		},
	});

	const { id } = employee;

	const result = await prisma.employee.update({
		where: { id },
		data: {
			state: 'D',
		},
	});
	res.json({
		msg: 'Employee delete sucessfull!',
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
