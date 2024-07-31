const dataService = require('../services/dataService');

const initializeData = async (req, res) => {
  try {
    await dataService.fetchDataAndStore();
    res.status(200).json({ message: 'Data initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize data' });
  }
};

module.exports = { initializeData };
