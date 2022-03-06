const { Router } = require('express');
const {getData} = require('../../src/parseData.js');
const router = Router();

router.get('/', (req, res) => {

    res.status(200).send(getData('fontaines'));
});

module.exports = router;