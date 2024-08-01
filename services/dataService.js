const fs = require('fs').promises; 
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/dummyData.json');
const url = process.env.DATA_URL;

let cachedData = null;
let lastCacheTime = 0;
const cacheDuration = 1000 * 60 * 60; // 1 hour

const fetchDataAndStore = async () => {
    try {
        const response = await axios.get(url);
        const dataJson = JSON.stringify(response.data, null, 2);
        await fs.writeFile(dataFilePath, dataJson);
        console.log('Data fetched and stored successfully.');
        cachedData = null;
        lastCacheTime = 0;
    } catch (error) {
        console.error('Error fetching or storing data:', error.message);
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
        console.error('Error reading data:', error.message);
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

const sortData = (data, sortBy, order = 'asc') => {
    return data.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        let comparison = 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
        }

        return order === 'desc' ? -comparison : comparison;
    });
};

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

        if (query.bio) {
            data = data.filter(item => item.bio.toLowerCase().includes(query.bio.toLowerCase()));
        }

        if (query.version) {
            const versionNumber = parseFloat(query.version);
            data = data.filter((item) => item.version >= versionNumber);
        }

        if (query.sortBy) {
            const validSortFields = ['name', 'language', 'bio', 'version'];
            if (validSortFields.includes(query.sortBy)) {
                const order = query.order && ['asc', 'desc'].includes(query.order) ? query.order : 'asc';
                data = sortData(data, query.sortBy, order);
            } else {
                throw new Error(`Invalid sort field: ${query.sortBy}`);
            }
        }

        return data;
    } catch (error) {
        console.error('Error filtering and sorting data:', error.message);
        throw new Error('Failed to filter and sort data');
    }
};

module.exports = { fetchDataAndStore, filterAndSortData, readData };
