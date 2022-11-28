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
	const nit = parseInt(req.params.nit);
	const result = await prisma.clientCompany.findMany({
		where: {
			company: {
				nit,
			},
		},
		select: {
			client: {
				select: {
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

const deleteLinkClient = async (req = request, res = response) => {
	const companyId = req.params.companyId;
	const clientId = req.params.clientId;

	const result = await prisma.clientCompany.delete({
		where: {
			clientId_companyId: parseInt(clientId + companyId),
		},
	});
	res.json({
		msg: 'Link deleted sucessfull!',
		result,
	});
};

module.exports = {
	createLinkClientCompany,
	getAllClients,
	deleteLinkClient,
};
