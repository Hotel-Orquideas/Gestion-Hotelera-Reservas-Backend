const jwt = require('jsonwebtoken');
const { prisma } = require('../controllers/employee-controller');

const validateJWT = async (req, res, next) => {
	const token = req.header('x-token');
	if (!token) {
		return res.status(401).json({
			msg: 'No se encontró token en la petición',
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);

		console.log(uid);

		const employee = await prisma.employee.findUnique({ where: { id: uid } });

		if (!employee) {
			return res.status(401).json({
				msg: 'Token no válido - Usuario no existe',
			});
		}

		if (employee.state === 'D') {
			return res.status(401).json({
				msg: 'Token no válido - Usuario inactivo',
			});
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Token no válido',
		});
	}
};

module.exports = {
	validateJWT,
};
