const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Patient
router.post('/patient/register', authController.registerPatient);
router.post('/patient/login', authController.loginPatient);

// Doctor
router.post('/doctor/register', authController.registerDoctor);
router.post('/doctor/login', authController.loginDoctor);

// Admin
router.post('/admin/login', authController.loginAdmin);

module.exports = router;