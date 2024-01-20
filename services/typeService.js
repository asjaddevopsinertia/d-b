const db = require("../db/db");
const bcrypt = require("bcrypt");



exports.getAllTypes = (res) => {
    const getAllUsersQuery = `
      SELECT * FROM house_type
    `;
  
    db.query(getAllUsersQuery, (err, results) => {
      console.log("results", results)
      if (err) {
        console.error('Error retrieving users from the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({type : results});
      }
    });
  };