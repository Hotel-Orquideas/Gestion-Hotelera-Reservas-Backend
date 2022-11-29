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

const getIdFromList = async (req = request) => {
	const list = getDocsFromRequest(req);
	//console.log(list);
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
		//console.log(clientId);
		myIds.push(clientId);
	});
	console.log(myIds);
	return myIds;
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

module.exports = {
	linkClientsWithBooking,
	prisma,
};
