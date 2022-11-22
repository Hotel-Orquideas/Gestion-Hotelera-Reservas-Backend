const { Router } = require('express');
const { createBooking, getBooking, getAllBookings, updateBooking, deleteBooking } = require('../controllers/booking-controller');

const router = Router();

router.post('/', createBooking);

router.get('/:id', getBooking);

router.get('/', getAllBookings);

router.put('/:id', updateBooking);

router.patch('/:id', deleteBooking);

module.exports = router;
