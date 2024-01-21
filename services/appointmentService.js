const db = require('../db/db');

exports.selectService = (userId, appointments, appointmentDate, res) => {
  const appointmentQuery = `
  INSERT INTO appointments (user_id, service_id, address_id, appointment_date, user_name, service_name, address_name, type_name, number_of_rooms, number_of_bathrooms, price)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const insertedAppointmentIds = [];

  const processAppointment = (appointment) => {
    console.log("app", appointment)
    const { serviceId, addressId, extras, typeName, numberOfRooms, numberOfBathrooms,price } = appointment;

    const userNameQuery = 'SELECT username FROM users WHERE user_id = ?';
    const serviceNameQuery = 'SELECT service_name FROM services WHERE service_id = ?';
    const addressNameQuery = 'SELECT CONCAT_WS(", ", address_line1, address_line2, city, state, zip_code) AS full_address FROM addresses WHERE address_id = ?';

    db.query(userNameQuery, [userId], (userErr, userResults) => {
      if (userErr) {
        console.error('Error fetching user name:', userErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const userName = userResults[0].username;

      db.query(serviceNameQuery, [serviceId], (serviceErr, serviceResults) => {
        if (serviceErr) {
          console.error('Error fetching service name:', serviceErr);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        const serviceName = serviceResults[0].service_name;

        db.query(addressNameQuery, [addressId], (addressErr, addressResults) => {
          if (addressErr) {
            console.error('Error fetching address name:', addressErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          const addressName = addressResults[0].full_address;

          db.query(appointmentQuery, [userId, serviceId, addressId, appointmentDate, userName, serviceName, addressName, typeName, numberOfRooms, numberOfBathrooms,price], (err, results) => {
            if (err) {
              console.error('Error creating appointment:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              const appointmentId = results.insertId;
              insertedAppointmentIds.push(appointmentId);

              if (extras && extras.length > 0) {
                const extrasQuery = 'INSERT INTO appointment_extras (appointment_id, extra_id) VALUES (?, ?)';
                extras.forEach((extraId) => {
                  db.query(extrasQuery, [appointmentId, extraId], (extrasErr) => {
                    if (extrasErr) {
                      console.error('Error adding extras to appointment:', extrasErr);
                    }
                  });
                });
              }
            }

            if (insertedAppointmentIds.length === appointments.length) {
              // Return the array of created appointment ids in the response
              res.json({ message: 'Appointments created successfully', appointmentIds: insertedAppointmentIds });
            }
          });
        });
      });
    });
  };

  appointments.forEach(processAppointment);
};


exports.getAppointmentByUserId = (userId, res) => {
  const getAppointmentQuery = `
  SELECT a.*, e.extra_name
  FROM appointments a
  LEFT JOIN appointment_extras ae ON a.appointment_id = ae.appointment_id
  LEFT JOIN extras e ON ae.extra_id = e.extra_id
  WHERE a.user_id = ?
`;

db.query(getAppointmentQuery, [userId], (err, results) => {
  if (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    const appointmentsWithExtras = {};

    results.forEach((row) => {
      const {
        appointment_id,
        user_id,
        service_id,
        address_id,
        user_name,
        service_name,
        address_name,
        appointment_date,
        extra_name,
        status
      } = row;

      if (!appointmentsWithExtras[appointment_id]) {
        // Initialize array for extras if it doesn't exist
        appointmentsWithExtras[appointment_id] = {
          appointment_id,
          user_id,
          service_id,
          address_id,
          user_name,
          service_name,
          address_name,
          appointment_date,
          status,
          extras: [],
        };
      }

      // Add extra_name to the extras array
      appointmentsWithExtras[appointment_id].extras.push(extra_name);
    });

    // Convert the object values to an array
    const appointmentsArray = Object.values(appointmentsWithExtras);

    res.json({ appointments: appointmentsArray });
  }
});
};

exports.getAllAppointments = (res) => {
  const getAllAppointmentsQuery = `
    SELECT * FROM appointments
  `;

  db.query(getAllAppointmentsQuery, (err, results) => {
    if (err) {
      console.error('Error fetching all appointments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ appointments: results });
    }
  });
};


exports.approveAppointment = (req, res) => {
  const { appointment_id } = req.params;

  const updateStatusQuery = `
    UPDATE appointments
    SET status = 'approved'
    WHERE appointment_id = ?
  `;

  db.query(updateStatusQuery, [appointment_id], (err, result) => {
    if (err) {
      console.error('Error updating appointment status:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.json({ message: 'Appointment status updated to approved' });
    }
  });
};