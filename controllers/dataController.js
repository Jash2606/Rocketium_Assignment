const dataService = require('../services/dataService');

const initializeData = async (req, res) => {
  try {
    await dataService.fetchDataAndStore();
    res.status(200).json({ message: 'Data initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize data' });
  }
};

const getData = async (req, res) => {
    try {
      const data = await dataService.filterAndSortData(req.query);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };
  

module.exports = { initializeData , getData };
