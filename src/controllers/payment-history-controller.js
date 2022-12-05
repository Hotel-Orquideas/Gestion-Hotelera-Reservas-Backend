const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createPaymentHistory = async (req = request, res = response) => {
	const { valueToPay, billId, paymentMethodId } = req.body;
	const result = await prisma.paymentHistory.create({
		data: {
			valueToPay,
			dateOfPay: new Date(Date.now()).toISOString(),
			bill: { connect: { billId } },
			paymentMethod: { connect: { id: paymentMethodId } },
		},
	});
	res.json({
		msg: 'Payment history create sucessfull!',
		result,
	});
};

const getPaymentHistoryById = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.paymentHistory.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllPaymentHistories = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const results = await prisma.paymentHistory.findMany({
		where: { billId: id },
	});
	res.json(results);
};

const updatePaymentHistory = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.paymentHistory.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Payment history updated sucessfull!',
		result,
	});
};

module.exports = {
	createPaymentHistory,
	getPaymentHistoryById,
	getAllPaymentHistories,
	updatePaymentHistory,
	prisma,
};
