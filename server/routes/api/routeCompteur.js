const {Router} = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const {getCounterModel} = require('../../models/counterModel');
const {getDataStatsModel} = require('../../models/dataStatsModel');

const router = Router();

// GET /gti525/v1/compteurs
router.get('/', (req, res) => {
    const limit = req.query['limit'];
    const sort = {
        [req.query['sort_by']]: req.query['sort_dir'],
    };

    getCounterModel()
        .find({}, {_id: 0, ID: 1, Nom: 1, Statut: 1, Annee_implante: 1})
        .limit(limit)
        .sort(sort)
        .exec((err, counters) => {
            res.status(200).send(counters);
        });
});

// GET /gti525/v1/compteurs/:compteurId
router.get('/:id', async (req, res) => {
    const compteurId = req.params.id;

    await getCounterModel().findOne({ID: compteurId}, {_id: 0, __v: 0}).exec((err, result) => {
        if (err) res.status(400).send(err);

        res.status(200).send(result);
    });
});

// GET /gti525/v1/compteurs/:compteurId/passages
router.get('/:id/passages', async (req, res) => {
    const compteurId = req.params.id;
    const start = req.query['debut'];
    const end = req.query['fin'];
    const limite = req.query['limite']; // TODO: use limite in request

    if (!start || !end) {
        res.status(400).send({message: 'Missing start or end date'});
    }


    await getCounterModel().findOne({ID: compteurId}, {_id: 0, __v: 0}).exec((err, result) => {


        const counter = result;
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
            const counterData = Object.values(counterPerDay.reduce((rv, c) => {
                if (!rv[c.date]) {
                    rv[c.date] = {date: c.date, count: 0};
                    sum.push(rv[c.date]);
                }
                rv[c.date].count += c.count;

                return rv;
            }, {})).slice(0, limite);

            res.status(200).send({
                ...counter._doc,
                counterData,
            });
        });
    });
});

module.exports = router;