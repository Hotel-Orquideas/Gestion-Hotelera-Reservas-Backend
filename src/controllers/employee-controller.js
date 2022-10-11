const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

const prisma = new PrismaClient();


const createEmployee = async (req = request, res = response) => {
	
	const { name, lastName, typeDocument, document, genre, birthdate, phoneNumber, email, bloodType, position } = req.body;
	const result = await prisma.employee.create({
		data: {
			position,
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
			role: {
				connect: { id: 3 },
			},
			hotel: {
				connect: { id: 1 },
			},
		},
		include: { person: true },
	});
	res.json({
		msg: 'Employee create sucessfull!',
		result,
	});
	console.log(result);
};


const getEmployee = async (req = request, res = response) => {
	const document = req.params.doc;
	const result = await prisma.employee.findFirst({
		where: {
			person: {
				document,
			},
		},
		select: {
			id: true,
			position: true,
			state: true,
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
	res.json(result);
};


const getAllEmployees = async (req = request, res = response) => {
	const results = await prisma.employee.findMany({
		where: {
			state: 'A',
		},
		select: {
			id: true,
			position: true,
			state: true,
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

const updateEmployee = async (req = request, res = response) => {
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


const deleteEmployee = async (req = request, res = response) => {
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
	createEmployee,
	getEmployee,
	getAllEmployees,
	updateEmployee,
	deleteEmployee,
};
