const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/initialize-data', dataController.initializeData);
router.get('/data', dataController.getData);
router.get('/all-data', dataController.getAllData);

module.exports = router;
