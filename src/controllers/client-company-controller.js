const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');

let prisma = new PrismaClient();

const createLinkClientCompany = async (req = request, res = response) => {
	const companyId = req.params.companyId;
	const clientId = req.params.clientId;
	const result = await prisma.clientCompany.create({
		data: {
			company: {
				connect: {
					id: parseInt(companyId),
				},
			},
			client: {
				connect: {
					id: parseInt(clientId),
				},
			},
		},
	});

	res.json({
		msg: 'Link create sucessfull!',
		result,
	});
	console.log('Enlace creado exitosamente!');
};

const getAllClients = async (req = request, res = response) => {
	const id = parseInt(req.params.id);
	const result = await prisma.clientCompany.findMany({
		where: {
			companyId: id,
		},
		select: {
			client: {
				select: {
					id: true,
					dateIssuanceDoc: true,
					countryOrigin: true,
					countryDestination: true,
					cityOrigin: true,
					cityDestination: true,
					profession: true,
					state: true,
					hotelId: false,
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
					hotel: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	});

	res.json(result);
};

const updateLinkClient = async (req = request, res = response) => {
	const clientId = req.params.clientId;
	const { companyIdOld, companyIdNew } = req.body;

	if (!companyIdNew) {
		const linkRemoved = await prisma.clientCompany.delete({
			where: {
				clientId_companyId: parseInt(clientId + companyIdOld),
			},
		});
		res.json({
			msg: 'Enlace borrado exitosamente!',
			linkRemoved,
		});
	}

	const existCompany = await prisma.clientCompany.findFirst({
		where: {
			companyId: companyIdNew,
		},
	});

	if (!existCompany) {
		res.json({
			msg: 'Empresa no existente',
		});
	}
	const result = await prisma.clientCompany.update({
		where: {
			clientId_companyId: parseInt(clientId + companyIdOld),
		},
		data: {
			companyId: companyIdNew,
		},
	});
	res.json({
		msg: 'Link updated sucessfull!',
		result,
	});
};

module.exports = {
	createLinkClientCompany,
	getAllClients,
	updateLinkClient,
};
