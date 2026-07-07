const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');

// Generate a new doctor authorization code
async function generateDoctorCode(req, res, next) {
  try {
    const code = await doctorModel.generateDoctorCode();
    res.status(201).json({ message: 'New doctor code generated.', code });
  } catch (err) {
    next(err);
  }
}

// View all doctors
async function getAllDoctors(req, res, next) {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
}

// View all appointments across the system
async function getAllAppointments(req, res, next) {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

module.exports = { generateDoctorCode, getAllDoctors, getAllAppointments };