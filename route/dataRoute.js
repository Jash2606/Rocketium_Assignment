const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/data/filter', dataController.getData);
router.get('/all-data', dataController.getAllData);

module.exports = router;
