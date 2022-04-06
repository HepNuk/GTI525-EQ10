const { Router } = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const { getPointOfIntrestModel } = require('../../models/pointOfIntrestModel');

const router = Router();

const TYPES = {
  fontaine: 'Fontaine à boire',
  atelier: 'Atelier de réparation vélo',
};

// GET /gti525/v1/pointsdinteret
router.get('/', (req, res) => {
  const { limit, type, nom } = req.query;
  
  const sort = {
    Arrondissement: 'asc',
  };

  const query = {
    Type: TYPES[type],
  };
  
  if (nom) query.Nom_parc_lieu = { $regex: nom },
  Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
  
  const projection = { _id: 0, __v: 0 };

  getPointOfIntrestModel()
    .find(query, projection)
    .sort(sort)
    .limit(limit)
    .exec((err, result) => {
      res.status(200).send(result);
    });
});

// GET /gti525/v1/:pointOfIntrestId
router.get('/:id', async (req, res) => {
  const query = {
    ID: req.params.id,
  };
  // build mongoose query here

  getPointOfIntrestModel()
    .findOne(query)
    .exec((err, result) => {
      res.status(200).send(result);
  });
});

router.post('/new', async (req, res) => {
  const newPointOfInterestData = req.body;
  const [ mostRecentPoI ] = await getPointOfIntrestModel()
                                      .find()
                                      .sort({ID: 'desc'})
                                      .limit(1);
                                
  // build mongoose query here
  newPointOfInterestData.ID = mostRecentPoI.ID + 1;
  getPointOfIntrestModel().insertMany(newPointOfInterestData);
  res.sendStatus(201);
});


module.exports = router;
