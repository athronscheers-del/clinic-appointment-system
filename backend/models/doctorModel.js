const pool = require('../config/db');

async function isValidUnusedCode(code) {
  const result = await pool.query(
    `SELECT * FROM doctor_codes WHERE code = $1 AND is_used = FALSE`,
    [code]
  );
  return result.rows[0];
}

async function markCodeAsUsed(code) {
  await pool.query(
    `UPDATE doctor_codes SET is_used = TRUE WHERE code = $1`,
    [code]
  );
}

async function createDoctor(fullName, email, passwordHash, specialization, experience, doctorCode) {
  const result = await pool.query(
    `INSERT INTO doctors (full_name, email, password_hash, specialization, years_experience, doctor_code)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, full_name, email, specialization, years_experience`,
    [fullName, email, passwordHash, specialization, experience, doctorCode]
  );
  return result.rows[0];
}

async function findDoctorByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM doctors WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function findDoctorById(id) {
  const result = await pool.query(
    `SELECT id, full_name, email, specialization, years_experience, created_at
     FROM doctors WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function getAllDoctors() {
  const result = await pool.query(
    `SELECT id, full_name, email, specialization, years_experience FROM doctors ORDER BY full_name`
  );
  return result.rows;
}

async function generateDoctorCode() {
  const result = await pool.query(
    `SELECT code FROM doctor_codes ORDER BY id DESC LIMIT 1`
  );
  let nextNum = 1;
  if (result.rows.length > 0) {
    const lastCode = result.rows[0].code; // e.g. DOC003
    nextNum = parseInt(lastCode.replace('DOC', ''), 10) + 1;
  }
  const newCode = `DOC${String(nextNum).padStart(3, '0')}`;
  await pool.query(`INSERT INTO doctor_codes (code) VALUES ($1)`, [newCode]);
  return newCode;
}

module.exports = {
  isValidUnusedCode,
  markCodeAsUsed,
  createDoctor,
  findDoctorByEmail,
  findDoctorById,
  getAllDoctors,
  generateDoctorCode,
};