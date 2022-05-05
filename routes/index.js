const router = require('express').Router();

// route any uri that begins with /contacts to the contacts file
router.use('/contacts', require('./contacts'));

/*
router.get('/', (req, res) => {
    res.send('Ahoy, Madison!!');
});*/

module.exports = router;