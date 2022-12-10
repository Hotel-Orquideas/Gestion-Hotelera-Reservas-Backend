const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createPaymentHistory = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { valueToPay, paymentMethodId } = req.body;
	const result = await prisma.paymentHistory.create({
		data: {
			valueToPay,
			dateOfPay: new Date(Date.now()).toISOString(),
			bill: { connect: { id } },
			paymentMethod: { connect: { id: parseInt(paymentMethodId) } },
		},
	});

	const myBill = await prisma.bill.findUnique({
		where:{ id }
	});

	const { balanceDue } = myBill;

	const toUpdate = await prisma.bill.update({
		where:{
			id
		},
		data:{ 
			balanceDue: parseInt(balanceDue - valueToPay)
		}
	});

	console.log(toUpdate);

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
		select:{
			id:true,
			valueToPay:true,
			dateOfPay:true,
			paymentMethodId:true,
			paymentMethod:{
				select:{
					id:true,
					name:true
				}
			}

		}
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
