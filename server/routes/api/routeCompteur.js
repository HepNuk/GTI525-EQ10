const { Router } = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const { getCounterModel } = require('../../models/counterModel');
const { getDataStatsModel } = require('../../models/dataStatsModel');

const router = Router();

// GET /gti525/v1/compteurs
router.get('/', (req, res) => {
  getCounterModel().find({ }, (err, counters) => {
    res.status(200).send(counters);
  });
});

// GET /gti525/v1/compteurs/:compteurId
router.get('/:id', async (req, res) => {
  const compteurId = req.params.id;

  await getCounterModel().findOne({ ID: compteurId }).exec((err, result) => {
    if (err) res.status(400).send(err);

    res.status(200).send(result);
  });
});

// GET /gti525/v1/compteurs/:compteurId/passages
router.get('/:id', async (req, res) => {
  const compteurId = req.params.id;
  const start = req.query['debut'];
  const end = req.query['fin'];

  if (!start || !end) {
    res.status(400).send({ message: 'Missing start or end date' });
  }

  await getCounterModel().findOne({ ID: compteurId }).exec((err, result) => {
    counter = result;

    const startDate = moment(start).format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment(end).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss');

    getDataStatsModel().find({ 
      Date: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    }).sort({ 
      Date: 'asc',
    }).exec((err, counters) => {

      // Group and sum counts by Date
      const counterPerDay = counters.map((e) => {
        return {
          date: moment(e.Date).format('YYYY-MM-DD'),
          count: e[compteurId],
        };
      });
      const sum = [];
      const counterData = counterPerDay.reduce((rv, c) => {
        if (!rv[c.date]) {
          rv[c.date] = { date: c.date, count: 0 };
          sum.push(rv[c.date]);
        }
        rv[c.date].count += c.count;
        return rv;
      }, {});
      
      res.status(200).send({
        ...counter._doc,
        counterData,
      });
    });
  });
});

module.exports = router;