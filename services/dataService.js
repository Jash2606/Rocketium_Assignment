const fs = require('fs').promises; 
const axios = require('axios');
require('dotenv').config();

const url = process.env.DATA_URL;

const fetchDataAndStore = async () => {
  try {
    const response = await axios.get(url);
    const dataJson = JSON.stringify(response.data, null, 2);
    await fs.writeFile('./data/dummyData.json', dataJson);
    console.log('Data fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
};

module.exports = { fetchDataAndStore };
