const pool = require('../config/db');

async function createPatient(fullName, email, passwordHash) {
  const result = await pool.query(
    `INSERT INTO patients (full_name, email, password_hash)
     VALUES ($1, $2, $3) RETURNING id, full_name, email`,
    [fullName, email, passwordHash]
  );
  return result.rows[0];
}

async function findPatientByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM patients WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function findPatientById(id) {
  const result = await pool.query(
    `SELECT id, full_name, email, created_at FROM patients WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = { createPatient, findPatientByEmail, findPatientById };