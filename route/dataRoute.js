const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/initialize-data', dataController.initializeData);

module.exports = router;
