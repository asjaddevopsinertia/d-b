const userService = require('../services/userService');

exports.register = (req, res) => {
  const { username, email, phone_no, password } = req.body;
  userService.register(username, email, phone_no, password, res);
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    userService.login(email, password, res);
  };

  exports.createAddress = (req, res) => {
    const { user_id, address_line1, address_line2, city, state, zip_code } = req.body;
    userService.createAddress(user_id, address_line1, address_line2, city, state, zip_code, res);
  };

  exports.getAllUsers = (req, res) => {
    userService.getAllUsers(res)
  }