const express = require('express');
const router = express.Router();
const extraController = require('../controllers/extraController');

router.get('/extras', extraController.getAllExtras);
router.get('/extras/:id', extraController.getExtraById);
router.get('/getExtras', extraController.getExtraByUserId);
router.post('/extras', extraController.createExtra);
router.put('/extras/:id', extraController.updateExtra);
router.delete('/extras/:id', extraController.deleteExtra);

module.exports = router;