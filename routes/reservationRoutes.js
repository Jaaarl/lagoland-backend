const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createReservation, getReservations, checkoutReservation, getReservationById } = require('../controllers/reservationController');

router.post('/', auth, createReservation);
router.get('/', auth, getReservations);
router.get('/:id', auth, getReservationById);
router.post('/:id/checkout', auth, checkoutReservation);


module.exports = router;