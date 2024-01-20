const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');


router.get('/getAllTypes', typeController.getAllTypes);

module.exports = router;
