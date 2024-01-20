const db = require('../db/db');

const getAllServices = (callback) => {
  const query = 'SELECT * FROM services';
  db.query(query, (error, results) => {
    if (error) throw error;
    callback(results);
  });
};

const getServiceById = (serviceId, callback) => {
  const query = 'SELECT * FROM services WHERE service_id = ?';
  db.query(query, [serviceId], (error, results) => {
    if (error) throw error;
    callback(results[0]);
  });
};

const createService = (newService, callback) => {
  const query = 'INSERT INTO services SET ?';
  db.query(query, newService, (error, results) => {
    if (error) throw error;
    const insertedId = results.insertId;
    getServiceById(insertedId, callback);
  });
};

const updateService = (serviceId, updatedService, callback) => {
  const query = 'UPDATE services SET ? WHERE service_id = ?';
  db.query(query, [updatedService, serviceId], (error) => {
    if (error) throw error;
    getServiceById(serviceId, callback);
  });
};

const deleteService = (serviceId, callback) => {
  const query = 'DELETE FROM services WHERE service_id = ?';
  db.query(query, [serviceId], (error) => {
    if (error) throw error;
    callback();
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};