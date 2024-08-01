const fs = require('fs').promises; 
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/dummyData.json');

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

const readData = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    throw new Error('Failed to read data');
  }
};

const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
  };

const filterAndSortData = async (query) => {
  try {
    let data = await readData();
    data = removeDuplicates(data);
    if (query.language) {
      data = data.filter(item => item.language.toLowerCase() === query.language.toLowerCase());
    }

    if (query.sortBy) {
      data.sort((a, b) => {
        if (a[query.sortBy] > b[query.sortBy]) {
          return 1;
        } else if (a[query.sortBy] < b[query.sortBy]) {
          return -1;
        }
        return 0;
      });
    }

    return data;
  } catch (error) {
    console.error('Error filtering and sorting data:', error);
    throw new Error('Failed to filter and sort data');
  }
};

module.exports = { fetchDataAndStore , filterAndSortData };
