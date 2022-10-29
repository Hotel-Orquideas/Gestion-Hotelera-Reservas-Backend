const { Router } = require('express');
const { check } = require('express-validator');
const { createRoom, getRoom, getAllRooms, updateRoom, deleteRoom } = require('../controllers/room-controller');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/',
	[
		check('number', 'número de habitación obligatorio').not().isEmpty(),
		check('roomTypeId', 'identificador del tipo de habitación obligatorio').not().isEmpty(),
		validateFields,
	],
	createRoom
);

router.get('/:id', getRoom);

router.get('/', getAllRooms);

router.put('/:id', updateRoom);

router.delete('/:id', deleteRoom);

module.exports = router;
