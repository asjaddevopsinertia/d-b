const appointmentService = require('../services/appointmentService');

exports.selectService = (req, res) => {
  const { userId, appointments, appointmentDate } = req.body;
  appointmentService.selectService(userId, appointments, appointmentDate, res);
};


exports.getAppointmentByUserId = (req, res) => {
  const { userId } = req.body;
  appointmentService.getAppointmentByUserId(userId,res);
};

exports.getAllAppointments = (req, res) => {
  appointmentService.getAllAppointments(res);
};

exports.approveAppointment= (req, res) => {
  appointmentService.approveAppointment(req, res);
};