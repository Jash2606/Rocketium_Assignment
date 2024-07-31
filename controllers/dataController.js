const dataService = require('../services/dataService.js');


const getData = (req, res) => {
    try{
        dataService.fetchData().then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            res.status(500).send(error.message);
        });
    }catch(error){
        res.status(500).send(error.message);
    }
}

module.exports = { getData };
