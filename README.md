# Clinic Appointment Management System

A full-stack web application for scheduling appointments between patients and doctors, with separate role-based portals for patients, doctors, and administrators.

## Overview

This system allows patients to browse doctors by specialization and book appointments, doctors to manage their appointment schedule and update visit status, and administrators to oversee the platform — including issuing doctor authorization codes and monitoring all appointments.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (vanilla)
**Backend:** Node.js, Express.js
**Database:** PostgreSQL
**Authentication:** JWT (JSON Web Tokens), bcrypt password hashing

## Features

- Role-based authentication for Patients, Doctors, and Administrators
- Doctor registration gated behind admin-issued authorization codes
- Patients can browse doctors by specialization and years of experience
- Appointment booking with database-level double-booking prevention
- Doctors can view and update the status of their appointments (pending, confirmed, completed, cancelled)
- Admin dashboard to generate doctor codes, view all doctors, and monitor all appointments
- Centralized error handling and request logging middleware
- Responsive, healthcare-themed landing page

## Database Schema

See [`database/schema.sql`](database/schema.sql) for the full DDL, and [`database/er-diagram.png`](database/er-diagram.png) for the entity-relationship diagram.

**Tables:** `patients`, `doctors`, `doctor_codes`, `appointments`, `notifications`

## Project Structure
clinic-appointment-system/
├── backend/
│   ├── config/         # PostgreSQL connection setup
│   ├── controllers/     # Request handling logic
│   ├── middleware/       # Auth, role-based access, logging, error handling
│   ├── models/          # Database query functions
│   ├── routes/          # API endpoint definitions
│   ├── utils/            # JWT and bcrypt helpers
│   ├── app.js             # Express app configuration
│   └── server.js           # Server entry point
├── database/
│   ├── schema.sql          # PostgreSQL DDL
│   └── er-diagram.png       # Entity-relationship diagram
└── public/
├── index.html            # Landing page
├── *-login.html            # Role-specific login pages
├── *-register.html          # Patient/doctor registration
└── *-dashboard.html          # Role-specific dashboards
## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (v14+)

### 1. Clone the repository
```bash
git clone https://github.com/athronscheers-del/clinic-appointment-system.git
cd clinic-appointment-system
```

### 2. Set up the database
```bash
createdb clinic_db
psql -d clinic_db -f database/schema.sql
```

### 3. Configure environment variables
Create a `.env` file inside `backend/`:
```env
PORT=5050
DB_USER=postgres
DB_PASSWORD=Bolican97
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinic_db
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@clinic.com
ADMIN_ACCESS_CODE=SUPERADMIN2026
ADMIN_PASSWORD=clinic2026
```

### 4. Install dependencies and run
```bash
cd backend
npm install
npm run dev
```

### 5. Open the app
Visit `http://localhost:5050` in your browser.

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/patient/register` | Public |
| POST | `/api/auth/patient/login` | Public |
| POST | `/api/auth/doctor/register` | Public (requires valid doctor code) |
| POST | `/api/auth/doctor/login` | Public |
| POST | `/api/auth/admin/login` | Public (requires admin env credentials) |
| GET | `/api/doctors` | Public |
| GET | `/api/doctors/me/profile` | Doctor |
| GET | `/api/doctors/me/appointments` | Doctor |
| POST | `/api/appointments` | Patient |
| GET | `/api/appointments/mine` | Patient |
| PATCH | `/api/appointments/:id/status` | Doctor |
| POST | `/api/admin/doctor-codes` | Admin |
| GET | `/api/admin/doctors` | Admin |
| GET | `/api/admin/appointments` | Admin |

## Notes

The `notifications` table is included in the schema to support future appointment reminders, but is not yet wired into the application logic.



Athrons Abiy 153/BSC-B6/2023 