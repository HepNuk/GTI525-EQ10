const { Router } = require('express');
const {getData,fetchDataBetweenDate} = require("../../src/parseData.js");
const router = Router();

router.get('/:id', (req, res) => {

  let compteurId = req.params.id;
  let start = req.query['debut'];
  let end = req.query['fin'];

  res.send(fetchDataBetweenDate(compteurId,start,end));
})

router.get('/compteurs', (req, res) => {
  res.send(getData("compteurs"));
})
router.get('/fontaines', (req, res) => {
  res.send(getData("fontaines"));
})

module.exports = router;