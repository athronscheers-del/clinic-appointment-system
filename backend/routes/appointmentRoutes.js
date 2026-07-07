const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Patient-only: book + view own appointments
router.post('/', authMiddleware, roleMiddleware('patient'), appointmentController.bookAppointment);
router.get('/mine', authMiddleware, roleMiddleware('patient'), appointmentController.getMyAppointments);

// Doctor-only: update appointment status
router.patch('/:id/status', authMiddleware, roleMiddleware('doctor'), appointmentController.updateStatus);

module.exports = router;