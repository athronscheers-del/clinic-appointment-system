const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All admin routes require admin role
router.use(authMiddleware, roleMiddleware('admin'));

router.post('/doctor-codes', adminController.generateDoctorCode);
router.get('/doctors', adminController.getAllDoctors);
router.get('/appointments', adminController.getAllAppointments);

module.exports = router;