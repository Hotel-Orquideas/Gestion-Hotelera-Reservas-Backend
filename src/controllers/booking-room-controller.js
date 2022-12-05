const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const getIdRoomsFromRequest = (req = request) => {
	let myReq = req.body;
	//console.log(myReq);
	myReq = JSON.stringify(myReq);
	//console.log(myReq);
	let parsedJSON = JSON.parse(myReq);
	//console.log(parsedJSON);
	let roomsIds = [];
	parsedJSON.forEach((element) => {
		//console.log(element);
		roomsIds.push(element);
	});
	return roomsIds;
};

const linkBooksWithBooking = (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const listIds = getIdRoomsFromRequest(req);
	//console.log('Lista de ids: ' + list);
	listIds.forEach(async (element) => {
		//console.log(typeof element.id);
		const result = await prisma.bookingRoom.create({
			data: {
				bookingId: id,
				roomId: element.id,
			},
		});
		res.json({
			msg: 'Rooms linked with the bookings successfull!',
		});
		console.log(result);
	});
};

const getAllBookingsRooms = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.bookingRoom.findMany({
		where: { bookingId: id },
		select: {
			room: {
				select: {
					id: true,
					number: true,
					state: true,
					roomType: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	});
	res.json(result);
};

module.exports = {
	linkBooksWithBooking,
	getAllBookingsRooms,
	prisma,
};
