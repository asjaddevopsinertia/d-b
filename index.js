const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceRoutes = require('./routes/cleaningServiceRoutes')
const extraRoutes = require('./routes/extraRoutes')
const typeRoutes = require('./routes/typeRoutes')

var cors = require('cors')

const app = express();

app.use(cors())
const port = 4000;

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/payment', paymentRoutes);
app.use('/service', serviceRoutes);
app.use('/extra', extraRoutes);
app.use('/type', typeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});