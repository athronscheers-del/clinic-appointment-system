const patientModel = require('../models/patientModel');
const doctorModel = require('../models/doctorModel');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/generateToken');
require('dotenv').config();

// ---------- PATIENT ----------
async function registerPatient(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existing = await patientModel.findPatientByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const passwordHash = await hashPassword(password);
    const patient = await patientModel.createPatient(fullName, email, passwordHash);

    const token = generateToken({ id: patient.id, role: 'patient' });
    res.status(201).json({ token, user: patient });
  } catch (err) {
    next(err);
  }
}

async function loginPatient(req, res, next) {
  try {
    const { email, password } = req.body;
    const patient = await patientModel.findPatientByEmail(email);
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const match = await comparePassword(password, patient.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken({ id: patient.id, role: 'patient' });
    res.json({
      token,
      user: { id: patient.id, fullName: patient.full_name, email: patient.email },
    });
  } catch (err) {
    next(err);
  }
}

// ---------- DOCTOR ----------
async function registerDoctor(req, res, next) {
  try {
    const { doctorCode, fullName, email, specialization, experience, password } = req.body;

    if (!doctorCode || !fullName || !email || !specialization || !experience || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const validCode = await doctorModel.isValidUnusedCode(doctorCode);
    if (!validCode) {
      return res.status(400).json({ message: 'Invalid or already used authorization code.' });
    }

    const existing = await doctorModel.findDoctorByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    if (Number(experience) < 15) {
      return res.status(400).json({ message: 'Doctors must have at least 15 years of experience.' });
    }

    const passwordHash = await hashPassword(password);
    const doctor = await doctorModel.createDoctor(
      fullName, email, passwordHash, specialization, experience, doctorCode
    );
    await doctorModel.markCodeAsUsed(doctorCode);

    const token = generateToken({ id: doctor.id, role: 'doctor' });
    res.status(201).json({ token, user: doctor });
  } catch (err) {
    next(err);
  }
}

async function loginDoctor(req, res, next) {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findDoctorByEmail(email);
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const match = await comparePassword(password, doctor.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken({ id: doctor.id, role: 'doctor' });
    res.json({
      token,
      user: {
        id: doctor.id,
        fullName: doctor.full_name,
        email: doctor.email,
        specialization: doctor.specialization,
        yearsExperience: doctor.years_experience,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ---------- ADMIN (fixed credentials from .env, no DB record) ----------
async function loginAdmin(req, res, next) {
  try {
    const { email, accessCode, password } = req.body;

    const validEmail = email === process.env.ADMIN_EMAIL;
    const validCode = accessCode === process.env.ADMIN_ACCESS_CODE;
    const validPassword = password === process.env.ADMIN_PASSWORD;

    if (!validEmail || !validCode || !validPassword) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const token = generateToken({ id: 'admin', role: 'admin' });
    res.json({ token, user: { email, role: 'admin' } });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
  loginAdmin,
};