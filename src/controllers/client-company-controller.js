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

module.exports = {
	createLinkClientCompany,
};
