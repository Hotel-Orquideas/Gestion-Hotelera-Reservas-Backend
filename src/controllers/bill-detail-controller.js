const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createBillDetail = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { description, value } = req.body;
	const result = await prisma.billDetail.create({
		data: {
			description,
			date: new Date(Date.now()).toISOString(),
			value,
			bill: { connect: { id } },
		},
	});

	const myBill = await prisma.bill.findUnique({
		where:{ id }
	});

	const { total, balanceDue } = myBill;

	const toUpdate = await prisma.bill.update({
		where:{
			id
		},
		data:{ 
			total: parseInt(total + value),
			balanceDue: parseInt(balanceDue + value)
		}
	});

	console.log(toUpdate);

	res.json({
		msg: 'Bill detail create sucessfull!',
		result,
	});
	console.log('Detalle de factura creada exitosamente!');
};

const getBillDetailById = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.billDetail.findUnique({
		where: {
			billId:id,
		},
	});
	res.json(result);
};

const getAllBillDetails = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const results = await prisma.billDetail.findMany({
		where: { billId: id },
	});
	res.json(results);
};

const updateBillDetail = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.billDetail.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Bill detail updated sucessfull!',
		result,
	});
};

module.exports = {
	createBillDetail,
	getBillDetailById,
	getAllBillDetails,
	updateBillDetail,
	prisma,
};
