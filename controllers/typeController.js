const typeService = require('../services/typeService');


exports.getAllTypes = (req, res) => {
    typeService.getAllTypes(res)
  }