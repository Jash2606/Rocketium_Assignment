const express = require('express');
const dataRoutes = require('./route/dataRoute.js');
require('dotenv').config();
const {initializeData} = require('./controllers/dataController.js');
const app = express();
app.use(express.json());
app.use('/api', dataRoutes);

initializeData();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
