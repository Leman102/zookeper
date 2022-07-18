//add express
const express = require('express');

//the require() statements will read the index.js file in each directory
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//import and use the fs library to write that data to animals.json.
const fs = require('fs');
const path = require('path');

//add the required data
const {animals} = require('./data/animals.json')
//create port const to run in heroku
const PORT = process.env.PORT || 3002;
//install server
const app = express();

//call multiple css and js files (from the public folder)
app.use(express.static('public'))

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listen the express method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
