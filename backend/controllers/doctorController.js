const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');

// Public: list all doctors (for patients browsing before booking)
async function getAllDoctors(req, res, next) {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
}

// Doctor: view own profile
async function getMyProfile(req, res, next) {
  try {
    const doctor = await doctorModel.findDoctorById(req.user.id);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

// Doctor: view own appointments + patients who booked them
async function getMyAppointments(req, res, next) {
  try {
    const appointments = await appointmentModel.getAppointmentsByDoctor(req.user.id);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllDoctors, getMyProfile, getMyAppointments };