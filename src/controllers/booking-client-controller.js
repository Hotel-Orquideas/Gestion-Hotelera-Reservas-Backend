const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const getDocsFromRequest = (req = request) => {
	let myReq = req.body;
	//console.log(myReq);
	myReq = JSON.stringify(myReq);
	//console.log(myReq);
	let parsedJSON = JSON.parse(myReq);
	//console.log(parsedJSON);
	let clientDocs = [];
	parsedJSON.forEach((element) => {
		//console.log(element);
		clientDocs.push(element);
	});
	return clientDocs;
};

const getIdFromList = (req = request) => {
	return new Promise((resolve) => {
		const list = getDocsFromRequest(req);
		let myIds = [];
		list.forEach(async (element) => {
			//console.log('donde voy: ' + element.document);
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
	//console.log('Lista de ids: ' + list);
	listIds.forEach(async (element) => {
		//console.log(typeof element.id);
		const result = await prisma.bookingClient.create({
			data: {
				bookingId: id,
				clientId: element.id,
			},
		});
		res.json({
			msg: 'clients linked with the bookings successfull!',
		});
		console.log(result);
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
