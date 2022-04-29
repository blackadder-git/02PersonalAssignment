const router = require('express').Router();

router.use('/contacts', require('./contacts'));

/*
router.get('/', (req, res) => {
    res.send('Ahoy, Madison!!');
});*/

module.exports = router;