const { Router } = require('express');
const {getData,fetchDataBetweenDate} = require('../../src/parseData.js');
const router = Router();

router.get('/:id', (req, res) => {

  let compteurId = req.params.id;
  let start = req.query['debut'];
  let end = req.query['fin'];

  res.status(200).send(fetchDataBetweenDate(compteurId,start,end));
});

router.get('/', (req, res) => {
  res.status(200).send(getData('compteurs'));
});

module.exports = router;