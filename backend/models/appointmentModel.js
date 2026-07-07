const pool = require('../config/db');

async function createAppointment(patientId, doctorId, date, time) {
  const result = await pool.query(
    `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [patientId, doctorId, date, time]
  );
  return result.rows[0];
}

async function getAppointmentsByPatient(patientId) {
  const result = await pool.query(
    `SELECT a.*, d.full_name AS doctor_name, d.specialization
     FROM appointments a
     JOIN doctors d ON a.doctor_id = d.id
     WHERE a.patient_id = $1
     ORDER BY a.appointment_date, a.appointment_time`,
    [patientId]
  );
  return result.rows;
}

async function getAppointmentsByDoctor(doctorId) {
  const result = await pool.query(
    `SELECT a.*, p.full_name AS patient_name, p.email AS patient_email
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     WHERE a.doctor_id = $1
     ORDER BY a.appointment_date, a.appointment_time`,
    [doctorId]
  );
  return result.rows;
}

async function getAllAppointments() {
  const result = await pool.query(
    `SELECT a.*, p.full_name AS patient_name, d.full_name AS doctor_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     JOIN doctors d ON a.doctor_id = d.id
     ORDER BY a.appointment_date DESC`
  );
  return result.rows;
}

async function updateAppointmentStatus(appointmentId, status) {
  const result = await pool.query(
    `UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *`,
    [status, appointmentId]
  );
  return result.rows[0];
}

module.exports = {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getAllAppointments,
  updateAppointmentStatus,
};