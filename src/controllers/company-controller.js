const { prisma } = require('./employee-controller');
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const createCompany = async (req = request, res = response) => {
	const { name, nit, email, phoneNumber, legalAgent } = req.body;

	const resultCompany = await prisma.company.create({
		data: {
			name,
			nit,
			email,
			phoneNumber,
			legalAgent,
		},
	});

	res.json({
		msg: 'Company create sucessfull!',
		resultCompany,
	});
	console.log('Empresa creada exitosamente!');
};

const getCompany = async (req = request, res = response) => {
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
	res.json(result);
};

const getAllCompanies = async (req = request, res = response) => {
	const results = await prisma.employee.findMany({
		where: {
			state: 'A',
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

const updateCompany = async (req = request, res = response) => {
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

const deleteCompany = async (req = request, res = response) => {
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
	createCompany,
	getCompany,
	getAllCompanies,
	updateCompany,
	deleteCompany,
	prisma,
};
