const { Router } = require('express');
const { linkBooksWithBooking, getAllBookingsRooms } = require('../controllers/booking-room-controller');

const router = Router();

router.post('/:id', linkBooksWithBooking);

router.get('/:id', getAllBookingsRooms);

module.exports = router;
