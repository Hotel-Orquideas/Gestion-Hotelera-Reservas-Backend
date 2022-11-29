const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const linkClientsWithBooking = async (req = request, res = response) => {
	const id = req.params.id;
	const myReq = req.body;
	let clientDocs = [];
	myReq.array.forEach((element) => {
		clientDocs.push(element);
	});

	let myIds = [];
	clientDocs.forEach(async (element) => {
		const clientId = await prisma.client.findFirst({
			where: {
				person: { document: element.document },
			},
			select: {
				id: true,
			},
		});
		myIds.push(clientId);
	});

	myIds.forEach(async (element) => {
		const result = await prisma.bookingClient.create({
			data: {
				bookingId: id,
				clientId: element,
			},
		});
		console.log(result);
	});

	res.json({
		msg: 'clients linked with the bookings successfull!',
		result,
	});
};

module.exports = {
	linkClientsWithBooking,
	prisma,
};
