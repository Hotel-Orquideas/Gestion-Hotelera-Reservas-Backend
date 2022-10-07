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
				connect: { id: 2 },
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
	const id = req.params.id;
	const result = await prisma.employee.findFirst({
		where: {
			person: {
				document: id,
			},
		},
		select: {
			id: true,
			position: true,
			state: true,
			person:{
				select:{
					id:true,
					name:true,
					lastName:true,
					typeDocument:true,
					document:true,
					genre:true,
					birthdate:true,
					phoneNumber:true,
					email:true,
					bloodType:true
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
		include: { person: true },
	});
	res.json(results);
	console.log(results);
};

const updateEmployee = (req = request, res = response) => {};

const deleteEmployee = (req = request, res = response) => {};

module.exports = {
	createEmployee,
	getEmployee,
	getAllEmployees,
	updateEmployee,
	deleteEmployee,
};
