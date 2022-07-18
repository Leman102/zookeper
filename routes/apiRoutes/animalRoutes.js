//use router to call express intead of using app.
const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');


//add data route
router.get('/animals', (req, res) => {
    let results = animals;
    //call filterByQuery function usin the req parameter
    if (req.query){
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

//create a new get for animal ids from using param which is specific to a single property
router.get('/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    //add 404 error if the id is not in the data
    if (result){
        res.json(result);
    } else {
        //res.sendStatus(status)
        res.send(404)
    }
});

//add post route 
router.post('/animals', (req,res) => {
    //req.body is where our incoming will be
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    
    //if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(animal);
    }
});

//export router
module.exports  = router;