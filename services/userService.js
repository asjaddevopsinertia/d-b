const db = require("../db/db");
const bcrypt = require("bcrypt");

exports.register = (username, email, phone_no, password, res) => {
  const checkQuery =
    "SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?";
  db.query(checkQuery, [username, email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking user existence:", checkErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const userCount = checkResults[0].count;

    if (userCount > 0) {
      // User already exists
      res.status(409).json({ status: "error", message: "User already exists" });
    } else {
      // User does not exist, proceed with registration
      bcrypt.hash(password, 10, (hashErr, hash) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr);
          res.status(500).json({ status: "error", message: "Internal Server Error" });
        } else {
          const insertQuery =
            "INSERT INTO users (username, email, phone_no, password) VALUES (?, ?, ?, ?)";
          db.query(
            insertQuery,
            [username, email, phone_no, hash],
            (insertErr, results) => {
              if (insertErr) {
                console.error("Error registering user:", insertErr);
                res.status(500).json({ status: "error", message: "Internal Server Error" });
              } else {
                const userId = results.insertId;
                res.json({ status: "success", message: "User registered successfully", userId });
              }
            }
          );
        }
      });
    }
  });
};

exports.login = (email, password, res) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    } else if (results.length === 0) {
      res.status(401).json({ status: "error", message: "Invalid email or password" });
    } else {
      const hashedPassword = results[0].password;
      bcrypt.compare(password, hashedPassword, (err, isValid) => {
        if (err) {
          console.error("Error during password comparison:", err);
          res.status(500).json({ status: "error", message: "Internal Server Error" });
        } else if (isValid) {
          const userId = results[0].user_id;
          const role = results[0].role
          res.json({ status: "success", message: "Login successful", userId , role});
        } else {
          res.status(401).json({ status: "error", message: "Invalid email or password" });
        }
      });
    }
  });
};


exports.createAddress = (userId, addressLine1, addressLine2, city, state, zipCode, res) => {
  const insertQuery =
    "INSERT INTO addresses (user_id, address_line1, address_line2, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [userId, addressLine1, addressLine2, city, state, zipCode],
    (insertErr, results) => {
      if (insertErr) {
        console.error("Error creating address:", insertErr);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const addressId = results.insertId;
        res.json({ status: "success", message: "Address created successfully", addressId });
      }
    }
  );
};


exports.getAllUsers = (res) => {
  const getAllUsersQuery = `
    SELECT * FROM users
  `;

  db.query(getAllUsersQuery, (err, results) => {
    console.log("results", results)
    if (err) {
      console.error('Error retrieving users from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({user : results});
    }
  });
};