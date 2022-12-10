const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const getDocsFromRequest = (req = request) => {
	let myReq = req.body;
	myReq = JSON.stringify(myReq);
	let parsedJSON = JSON.parse(myReq);
	let clientDocs = [];
	parsedJSON.forEach((element) => {
		clientDocs.push(element);
	});
	return clientDocs;
};

const getIdFromList = (req = request) => {
	return new Promise((resolve) => {
		const list = getDocsFromRequest(req);
		let myIds = [];
		list.forEach(async (element) => {
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
		setTimeout(() => {
			resolve(myIds);
			console.log(myIds);
			//Un seg por registro
		}, 2000);
	});
};

const linkClientsWithBooking = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const listIds = await getIdFromList(req);
	listIds.forEach(async (element) => {
		const result = await prisma.bookingClient.create({
			data: {
				bookingId: id,
				clientId: element.id,
			},
		});



		//console.log(result);
	});
	
	res.json({
		msg: 'clients linked with the bookings successfull!',
	});
};

const getAllBookingsClients = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.bookingClient.findMany({
		where: { bookingId: id },
		select: {
			client: {
				select: {
					cityOrigin: true,
					cityDestination: true,
					profession: true,
					state: true,
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
				},
			},
		},
	});
	res.json(result);
};

module.exports = {
	linkClientsWithBooking,
	getAllBookingsClients,
	prisma,
};
