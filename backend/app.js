const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const requestLogger = require('./middleware/logger');
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ---------- Global middleware ----------
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ---------- Serve frontend static files ----------
app.use(express.static(path.join(__dirname, '../public')));

// ---------- API routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

// ---------- Health check ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Clinic API is running' });
});

// ---------- 404 handler for unknown API routes ----------
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// ---------- Centralized error handler (must be last) ----------
app.use(errorMiddleware);

module.exports = app;