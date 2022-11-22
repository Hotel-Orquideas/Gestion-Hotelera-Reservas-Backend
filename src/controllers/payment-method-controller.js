const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createPaymentMethod = async (req = request, res = response) => {
	const { name } = req.body;

	const result = await prisma.paymentMethod.create({
		data: {
			name,
		},
	});

	res.json({
		msg: 'Payment method create sucessfull!',
		result,
	});
	console.log('Metodo de pago creado exitosamente!');
};

const getPaymentMethod = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.paymentMethod.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllPaymentMethods = async (req = request, res = response) => {
	const results = await prisma.paymentMethod.findMany({
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

module.exports = {
	createPaymentMethod,
	getPaymentMethod,
	getAllPaymentMethods,
	prisma,
};
