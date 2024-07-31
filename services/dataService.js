const axios = require('axios');
const express = require('express');
require('dotenv').config();

const dataUrl = process.env.DATA_URL;

const fetchData = async () => {
    try {
        const response = await axios.get(dataUrl);
        console.log('Data fetched successfully');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};



module.exports = { fetchData };
