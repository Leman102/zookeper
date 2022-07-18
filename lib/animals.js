const fs = require("fs");
const path = require("path");

//add filter functunality using query (fetch results after the ?)
function filterByQuery(query, animalsArray){
    // Save personalityTraits as a dedicated array.
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
        } else {
          personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
          // Check the trait against each animal in the filteredResults array.
          // Remember, it is initially a copy of the animalsArray,
          // but here we're updating it for each trait in the .forEach() loop.
          // For each trait being targeted by the filter, the filteredResults
          // array will then contain only the entries that contain the trait,
          // so at the end we'll have an array of animals that have every one 
          // of the traits when the .forEach() loop is finished.
          filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
          );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
};

//function to find an unique animal based on the id
function findById(id, animalsArray){
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

//create a new function that accepts the POST route's req.body value
//and the array we want to add the data to
function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal)
    //add  fs.writeFileSync() method, which is the synchronous version of fs.writeFile() 
    //and doesn't require a callback function
    fs.writeFileSync(
        //find the directory of the file we execute the code in,with the path to the animals.json file
        //save the JavaScript array data as JSON using JSON.stringify
        //the null argument means we don't want to edit any of our existing data;
        //The 2 indicates we want to create white space between our values to make it more readable
        path.join(__dirname,'../data/animals.json'),
        JSON.stringify({animals: animalsArray }, null, 2)
    );

    return animal;
};

//add validation to check if all data from req.body exists and it's the right type
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
};

//Export functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};