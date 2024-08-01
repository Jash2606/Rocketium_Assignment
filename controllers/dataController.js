const dataService = require('../services/dataService');

const initializeData =async () => {
    try {
        const data = await dataService.fetchDataAndStore();
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

const getAllData = async (req, res) => {
    try {
        const data = await dataService.readData(); 
        if (data && data.length > 0) {
            res.status(200).json(data);
        } else {
          res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getData = async (req, res) => {
    try {
      const data = await dataService.filterAndSortData(req.query);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };
  

module.exports = { initializeData , getData , getAllData };
