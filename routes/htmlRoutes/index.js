const path = require('path');

//use router to call express intead of using app.
const router = require('express').Router();

//call the indext.html file using '/' It brings us to the root route of the server
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

//add animals.html
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
//add zookepers.html
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
//if users adds an invalid route return wildcard/index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;