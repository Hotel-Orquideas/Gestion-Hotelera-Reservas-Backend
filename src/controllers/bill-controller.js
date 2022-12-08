const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

// const createBill = async (req = request, res = response) => {
// 	const { total, balanceDue, companyId, clientId } = req.body;
// 	console.log(companyId);
// 	if (companyId != '') {
// 		const result = await prisma.bill.create({
// 			data: {
// 				date: new Date(Date.now()).toISOString(),
// 				total,
// 				balanceDue,
// 				company: {
// 					connect: {
// 						id: parseInt(companyId),
// 					},
// 				},
// 				hotel: {
// 					connect: {
// 						id: 1,
// 					},
// 				},
// 			},
// 		});
// 		res.json({
// 			msg: 'Bill create sucessfull! - company',
// 			result,
// 		});
// 		console.log('Factura creada exitosamente!');
// 	} else if (clientId != '') {
// 		const result = await prisma.bill.create({
// 			data: {
// 				date: new Date(Date.now()).toISOString(),
// 				total,
// 				balanceDue,
// 				client: {
// 					connect: {
// 						id: parseInt(clientId),
// 					},
// 				},
// 				hotel: {
// 					connect: {
// 						id: 1,
// 					},
// 				},
// 			},
// 		});
// 		res.json({
// 			msg: 'Bill create sucessfull! - client',
// 			result,
// 		});
// 		console.log('Factura creada exitosamente!');
// 	}
// };

const getBillById = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.bill.findUnique({
		where: {
			id,
		},
	});
	res.json(result);
};

const getAllBills = async (req = request, res = response) => {
	const results = await prisma.bill.findMany({
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
		select:{
			date:true,
			total:true,
			balanceDue:true,
			hotelId:false,
			companyId:false,
			clientId:false,
			company:{
				select:{
					id:true,
					nit:true,
					name:true
				}
			},
			client:{
				select:{
					id:true,
					person:{
						name:true,
						lastName:true,
						document:true,
						phoneNumber:true
					}
				}
			}
		}
	});
	res.json(results);
};

const updateBill = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const { ...toUpdate } = req.body;

	const result = await prisma.bill.update({
		where: {
			id,
		},
		data: toUpdate,
	});
	res.json({
		msg: 'Bill updated sucessfull!',
		result,
	});
};

const updateState = async (req = request, res = response) => {
	const id = parseInt(req.params.id);

	const result = await prisma.bill.update({
		where: {
			id,
		},
		data: { state: 'C' },
	});
	res.json({
		msg: 'Bill updated state sucessfull!',
		result,
	});
};

module.exports = {
	getBillById,
	getAllBills,
	updateBill,
	updateState,
	prisma,
};
