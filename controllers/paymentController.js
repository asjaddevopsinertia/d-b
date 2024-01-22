const paymentService = require('../services/paymentService');

exports.makePayment = (req, res) => {
  const { userId, appointmentId, amount } = req.body;
  paymentService.makePayment(userId, appointmentId, amount, res);
};


exports.getPaymentsByUserId = (req, res) => {
  const { userId } = req.body;
  paymentService.getPaymentsByUserId(userId, res);
};


exports.getAllPayments = (req, res) => {
  paymentService.getAllPayments(res)
}

exports.config = (req, res) => {
  paymentService.config(res)
}

exports.create = (req, res) => {
  const { price } = req.body;
  paymentService.create(req, res, price)
}