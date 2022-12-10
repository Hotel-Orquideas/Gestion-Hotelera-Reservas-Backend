const { Router } = require('express');
const { createBooking, getBooking, getAllBookings, getAllBookingsCheckIn, updateBooking, deleteBooking, updateState } = require('../controllers/booking-controller');

const router = Router();

router.post('/', createBooking);

router.get('/:id', getBooking);

router.get('/', getAllBookings);

router.get('/checkin/:id',getAllBookingsCheckIn)//por ahora sirve así --- mejorar

router.put('/:id', updateBooking);

router.put('/:id/:state', updateState);

router.patch('/:id', deleteBooking);

module.exports = router;
