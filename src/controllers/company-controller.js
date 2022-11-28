const { prisma } = require('./employee-controller');
const { request, response } = require('express');

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
	const nit = req.params.nit;
	const result = await prisma.company.findUnique({
		where: {
			nit,
		},
	});
	res.json(result);
};

const getAllCompanies = async (req = request, res = response) => {
	const results = await prisma.company.findMany({
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
	});
	res.json(results);
	console.log(results);
};

const updateCompany = async (req = request, res = response) => {
	const nit = req.params.nit;
	const { ...toUpdate } = req.body;

	const result = await prisma.company.update({
		where: {
			nit,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Company updated sucessfull!',
		result,
	});
};

const deleteCompany = async (req = request, res = response) => {
	const nit = req.params.nit;

	const result = await prisma.company.update({
		where: { nit },
		data: {
			state: 'D',
		},
	});
	res.json({
		msg: 'Company delete sucessfull!',
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
