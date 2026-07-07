const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public: patients need this list before booking — no auth required
router.get('/', doctorController.getAllDoctors);

// Doctor-only routes
router.get('/me/profile', authMiddleware, roleMiddleware('doctor'), doctorController.getMyProfile);
router.get('/me/appointments', authMiddleware, roleMiddleware('doctor'), doctorController.getMyAppointments);

module.exports = router;