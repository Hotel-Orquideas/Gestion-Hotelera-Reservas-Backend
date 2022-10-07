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
					birthdate,
					phoneNumber,
					email,
					bloodType,
				},
			},
			role: {
				create: {
					name: 'Employee',
				},
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

const getEmployee = (req, res) => {
	res.send('Hola mundo');
};

const getAllEmployees = async (req, res) => {
	const results = await prisma.employee.findMany({
		include: { person: true },
	});
	res.json(results);
	console.log(results);
};

const updateEmployee = (req, res) => {};

const deleteEmployee = (req, res) => {};

module.exports = {
	createEmployee,
	getEmployee,
	getAllEmployees,
	updateEmployee,
	deleteEmployee,
};
