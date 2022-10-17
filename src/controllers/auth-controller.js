const { prisma } = require('./employee-controller');
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const login = async (req = request, res = response) => {
	const { userName, password } = req.body;

	try {
		/*
		/Validar si el correo existe
		*/
		const employeeResult = await prisma.employee.findFirst({
			where: {
				person: {
					email: userName,
				},
			},
		});

		if (!employeeResult) {
			return res.status(400).json({
				msg: 'Nombre de usuario o contraseña incorrectos - correo',
			});
		}

		if (employeeResult.state === 'D') {
			return res.status(400).json({
				msg: 'Nombre de usuario o contraseña incorrectos - estado:D',
			});
		}

		const credential = await prisma.credential.findUnique({
			where: {
				employeeId: employeeResult.id,
			},
		});

		const validatePassword = bcryptjs.compareSync(password, credential.password);
		if (!validatePassword) {
			return res.status(400).json({
				msg: 'Nombre de usuario o contraseña incorrectos - password',
			});
		}

		res.json({
			msg: 'Login ok',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Comuniquese con el administrador de la aplicación',
			error,
		});
	}
};

module.exports = login;
