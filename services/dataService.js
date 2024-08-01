const fs = require('fs').promises; 
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/dummyData.json');
const url = process.env.DATA_URL;

let cachedData = null;
let lastCacheTime = 0;
const cacheDuration = 1000 * 60 * 15; // 15 minutes

const fetchDataAndStore = async () => {
    try {
        const response = await axios.get(url);
        const dataJson = JSON.stringify(response.data, null, 2);
        await fs.writeFile(dataFilePath, dataJson);
        console.log('Data fetched and stored successfully.');
        cachedData = null;
        lastCacheTime = 0;
    } catch (error) {
        console.error('Error fetching or storing data:', error);
    }
};

const readData = async () => {
    const now = Date.now();
    if (!cachedData || now - lastCacheTime > cacheDuration) {
        try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        cachedData = JSON.parse(data);
        lastCacheTime = now;
        } catch (error) {
        console.error('Error reading data:', error);
        throw new Error('Failed to read data');
        }
    }
    return cachedData;
};

const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
        const duplicate = seen.has(item.id);
        seen.add(item.id);
        return !duplicate;
    });
};

const sortData = (data, sortBy) => {
    return data.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            if (valueA.toLowerCase() < valueB.toLowerCase()) return -1;
            if (valueA.toLowerCase() > valueB.toLowerCase()) return 1;
            return 0;
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
        }

        return 0; 
    });
}
;

const filterAndSortData = async (query) => {
  try {
    let data = await readData(); 
    data = removeDuplicates(data);

    if (query.search) {
        data = data.filter(item => item.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    
    if (query.language) {
      data = data.filter(item => item.language.toLowerCase() === query.language.toLowerCase());
    }

    if(query.bio){
        data = data.filter(item => item.bio.toLowerCase().includes(query.bio.toLowerCase()));
    }

    if(query.version){
        data = data.filter(item => item.version === query.version);
    }

    if (query.sortBy) {
        const validSortFields = ['name', 'language', 'bio', 'version'];
        if (validSortFields.includes(query.sortBy)) {
            data = sortData(data, query.sortBy);
          } else {
            throw new Error(`Invalid sort field: ${query.sortBy}`);
          }
    }

    return data;
  } catch (error) {
    console.error('Error filtering and sorting data:', error);
    throw new Error('Failed to filter and sort data');
  }
};

module.exports = { fetchDataAndStore, filterAndSortData , readData};
