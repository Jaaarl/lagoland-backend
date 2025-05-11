const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({ ...req.body, user: req.userId });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.userId });
  res.json(reservations);
};

exports.getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findOne({ _id: id, user: req.userId });
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ error: 'Invalid reservation ID' });
  }
};

exports.checkoutReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findOne({ _id: id, user: req.userId });
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

    if (reservation.isCheckedOut)
      return res.status(400).json({ error: 'Already checked out' });

    reservation.isCheckedOut = true;
    reservation.checkOutDate = new Date();
    await reservation.save();

    res.json({ message: 'Checked out successfully', reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};