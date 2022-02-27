const { Router } = require('express');
const {getData,fetchDataBetweenDate} = require("../../src/parseData.js");
const router = Router();

router.get('/:id', (req, res) => {

  let compteurId = req.params.id;
  let start = req.query['debut'];
  let end = req.query['fin'];

  res.send(getData("counter_stats_2019"));
})

module.exports = router;