const { Router } = require('express');
const { check } = require('express-validator');
const { createRoomType, getRoomType, getAllRoomTypes, updateRoomType, deleteRoomType } = require('../controllers/room-type-controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
	'/',
	[check('name', 'nombre obligatorio').not().isEmpty(), check('numMaxGuests', 'número máximo de huespedes obligatorio').not().isEmpty(), validateFields],
	createRoomType
);

router.get('/:id', getRoomType);

router.get('/', getAllRoomTypes);

router.put('/:id', updateRoomType);

router.delete('/:id', deleteRoomType);

module.exports = router;
