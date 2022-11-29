const { Router } = require('express');
const { linkClientsWithBooking } = require('../controllers/booking-client-controller');

const router = Router();

router.post('/:id', linkClientsWithBooking);

module.exports = router;
