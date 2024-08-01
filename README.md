

# Node.js Project with Dummy JSON Data

## Overview

This project demonstrates fundamental skills in Node.js and working with APIs. The project fetches dummy JSON data from a given URL, stores it on the Node.js server, and serves it through API endpoints. It also includes functionality for filtering and sorting the data.

## Features

- Fetch and store dummy JSON data from a URL
- Serve the stored data via API endpoints
- Initialize data on the first run
- Basic filtering and sorting of data
- Proper error handling and edge case management




## Instructions to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Jash2606/Rocketium_Assignment.git
   cd Rocketium_Assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following line with the URL for the dummy JSON data:
   ```plaintext
   DATA_URL= https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json
   ```


5. Run the server:
   ```bash
   node app.js
   ```

6. Access the API at:
   ```
   http://localhost:3050
   ```

## API Endpoints

### Endpoints

#### Initialize Data

- **URL:** `/api/initialize-data`
- **Method:** `GET`
- **Description:** Fetches the dummy JSON data from the URL specified in the `.env` file and stores it on the server.

#### Get All Data

- **URL:** `/api/all-data`
- **Method:** `GET`
- **Description:** Returns all stored data.

#### Filter and Sort Data

- **URL:** `/api/data/filter`
- **Method:** `GET`
- **Description:** Returns filtered and sorted data based on query parameters.

- **Query Parameters:**
  - `search`: Filter data by name (case-insensitive partial match).
  - `language`: Filter data by language (case-insensitive exact match).
  - `bio`: Filter data by bio (case-insensitive partial match).
  - `version`: Filter data by version (exact match or greater).
  - `sortBy`: Field to sort by (`name`, `language`, `bio`, `version`).
  - `order`: Sort order (`asc`, `desc`).



## API Documentation

### Testing Links
- **Initialize Data:** [http://localhost:3050/api/initialize-data](http://localhost:3050/api/initialize-data)
- **Get All Data:** [http://localhost:3050/api/all-data](http://localhost:3050/api/data/all-data)
- **Sort by Version:** [http://localhost:3050/api/data/filter?sortBy=version](http://localhost:3050/api/data/filter?sortBy=version)
- **Filter by Language:** [http://localhost:3050/api/data/filter?language=hindi](http://localhost:3050/api/data/filter?language=hindi)
- **Filter by Name:** [http://localhost:3050/api/data/filter?name=john](http://localhost:3050/api/data/filter?name=john)


## Postman Collection

You can import the Postman collection to test the API endpoints. Download the collection from the link below and import it into Postman.

[Download Postman Collection](./postman_collection.json)

Here is my Postman Collection Link : https://documenter.getpostman.com/view/33555544/2sA3kdBHwD 

### How to Import the Collection

1. Open Postman.
2. Click on the **Import** button in the top left corner.
3. Choose the **File** tab.
4. Click on **Choose Files** and select the `postman_collection.json` file.
5. Click **Import**.


