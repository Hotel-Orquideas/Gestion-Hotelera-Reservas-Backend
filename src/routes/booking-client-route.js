const { Router } = require('express');
const { linkClientsWithBooking, getAllBookingsClients } = require('../controllers/booking-client-controller');

const router = Router();

router.post('/:id', linkClientsWithBooking);

router.get('/id', getAllBookingsClients);

module.exports = router;
