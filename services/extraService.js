const db = require('../db/db');

const getAllExtras = (callback) => {
  const query = 'SELECT * FROM extras';
  db.query(query, (error, results) => {
    if (error) throw error;
    callback(results);
  });
};

const getExtraById = (extraId, callback) => {
  const query = 'SELECT * FROM extras WHERE extra_id = ?';
  db.query(query, [extraId], (error, results) => {
    if (error) throw error;
    callback(results[0]);
  });
};

const getExtraByUserId = (userId, callback) => {
  const query = 'SELECT * FROM extras WHERE user_id = ?';
  console.log("query", query)
  db.query(query, [userId], (error, results) => {
    if (error) throw error;
    callback(results[0]);
  });
};

const createExtra = (newExtra, callback) => {
  const query = 'INSERT INTO extras SET ?';
  db.query(query, newExtra, (error, results) => {
    if (error) throw error;
    const insertedId = results.insertId;
    getExtraById(insertedId, callback);
  });
};

const updateExtra = (extraId, updatedExtra, callback) => {
  const query = 'UPDATE extras SET ? WHERE extra_id = ?';
  db.query(query, [updatedExtra, extraId], (error) => {
    if (error) throw error;
    getExtraById(extraId, callback);
  });
};

const deleteExtra = (extraId, callback) => {
  const query = 'DELETE FROM extras WHERE extra_id = ?';
  db.query(query, [extraId], (error) => {
    if (error) throw error;
    callback();
  });
};

module.exports = {
  getAllExtras,
  getExtraById,
  createExtra,
  updateExtra,
  deleteExtra,
  getExtraByUserId
};