const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/select-service', appointmentController.selectService);
router.post('/getAppointment', appointmentController.getAppointmentByUserId);
router.get('/appointments', appointmentController.getAllAppointments);
router.put('/approve/:appointment_id', appointmentController.approveAppointment);

module.exports = router;