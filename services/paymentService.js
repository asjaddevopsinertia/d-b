const db = require('../db/db');
const stripe = require('stripe')('sk_test_51OXqbQHnIZ45tCR8PQot8XTmMvqTwb5uQ76OtKzHR74Ug1z0UC37WtA7Jcx96ZUR5GJNGjGdUcLJJNfm4CNYKPoS00bK3b6IoC');

exports.makePayment = (userId, appointmentId, amount, res) => {
  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Payment for appintment ' + appointmentId,
                },
                unit_amount: amount, // Amount in cents (adjust based on your pricing)
            },
            quantity: 1,
        },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
})
  .then((paymentIntent) => {
    const paymentQuery = `
      INSERT INTO payments (user_id, appointment_id, amount, payment_status, payment_date)
      VALUES (?, ?, ?, 'success', NOW())
    `;

    db.query(paymentQuery, [userId, appointmentId, amount], (err) => {
      if (err) {
        console.error('Error updating payment status in the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Payment successful', paymentIntent });
      }
    });
  })
  .catch((error) => {
    console.error('Error processing payment with Stripe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};


exports.getPaymentsByUserId = (userId, res) => {
  const getPaymentsQuery = `
    SELECT * FROM payments
    WHERE user_id = ?
  `;

  db.query(getPaymentsQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving payments from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};


exports.getAllPayments = (res) => {
  const getAllPaymentsQuery = `
    SELECT * FROM payments
  `;

  db.query(getAllPaymentsQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving payments from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};


exports.config  = (res) => {
  res.send({
    publishableKey: 'pk_test_51OXqbQHnIZ45tCR8pz9OEoZxgxLFLHGuPyIL6IgQw7XDWeY26nl6AlBdJrDzeDpSgl6VGJbrxkOEBZWIw9b7VOEW00xnYCwpJx',
  });
  
}



exports.create =  async(req, res, price) => {
  console.log("res", res)
  var dollarString = price;
var dollarAmount = parseFloat(dollarString);
var centsValue = dollarAmount * 100;

console.log("cents", centsValue)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: centsValue,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};