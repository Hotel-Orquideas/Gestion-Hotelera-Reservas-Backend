const { Router } = require('express');
const { createRoomService, getRoomServiceById, getAllRoomServices, updateRoomService } = require('../controllers/room-service-controller');

const router = Router();

router.post('/', createRoomService);

router.get('/:id', getRoomServiceById);

router.get('/all/:id', getAllRoomServices);

router.put('/:id', updateRoomService);

module.exports = router;
