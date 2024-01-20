const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/cleaningServicesController');
// const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.get('/services',   serviceController.getAllServices);
router.get('/services/:id',  serviceController.getServiceById);
router.post('/services',  serviceController.createService);
router.put('/services/:id',   serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;


