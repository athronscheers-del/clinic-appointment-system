const appointmentModel = require('../models/appointmentModel');

// Patient: book an appointment
async function bookAppointment(req, res, next) {
  try {
    const { doctorId, appointmentDate, appointmentTime } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'Doctor, date, and time are required.' });
    }

    const appointment = await appointmentModel.createAppointment(
      req.user.id, doctorId, appointmentDate, appointmentTime
    );

    res.status(201).json({ message: 'Appointment booked successfully.', appointment });
  } catch (err) {
    // Unique constraint violation = slot already taken
    if (err.code === '23505') {
      return res.status(409).json({ message: 'This time slot is already booked. Please choose another.' });
    }
    next(err);
  }
}

// Patient: view own appointments
async function getMyAppointments(req, res, next) {
  try {
    const appointments = await appointmentModel.getAppointmentsByPatient(req.user.id);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

// Doctor: update appointment status (confirm/cancel/complete)
async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updated = await appointmentModel.updateAppointmentStatus(id, status);
    res.json({ message: 'Status updated.', appointment: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { bookAppointment, getMyAppointments, updateStatus };