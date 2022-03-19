const { Router } = require('express');
const router = Router();
const {getCounterModel} = require('../../models/counterModel')
const {getDataStatsModel} = require('../../models/dataStatsModel')


router.get('/:id', (req, res) => {

  let compteurId = req.params.id;
  let start = req.query['debut'];
  let end = req.query['fin'];

  console.log(compteurId)
  getCounterModel().find({},function (err,docs){

    res.status(200).send(docs)

  })
});

router.get('/', (req, res) => {
  getCounterModel().find({},function (err,docs){

      res.status(200).send(docs)

  })
});

module.exports = router;