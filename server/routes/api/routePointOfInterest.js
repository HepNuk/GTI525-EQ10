const { Router } = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const {getPointOfIntrestModel} = require('../../models/pointOfIntrestModel');

const router = Router();

// GET /gti525/v1/pointsdinteret
router.get('/', (req, res) => {
  const { limit, type, nom } = req.query;
  
  console.log(type);
  const sort = {
    Arrondissement: 'asc',
  };

  const query = {
    Type: type,
    Nom_parc_lieu: nom,
  };

  
  Object.keys(query).forEach(key => query[key] === undefined ? delete query[key] : {});
  
  console.log(query);
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
router.get('/:id', (req, res) => {
  const pointOfIntrestId = req.params.id; // <<----- mongoose ID not fountain ID to make it simpler, 

  // build mongoose query here

  // getPointOfInterestModel().findOne(query).exec((err, result) => {
    res.status(200).send({ something: 'hi' });
  // });
});

router.post('/new', (req, res) => {
  const newPointOfInterestData = req.body;
  console.log('server : ', newPointOfInterestData);
  /*
    newPointOfInterestData should look something like this 
    may change later tho if so ill update it here too.

  {
    nom_lieu: 'string',
    adreesse: 'string',
    arrondissement: 'string',
    type: 'string that will be either fountain or atelier'
    annee_instalation: 'string',
    longitude: 'number',
    latitude: 'number',
    remarques: 'string',
  }
  */
  const newPOI = {
    Nom_parc_lieu: req.body.nom_lieu,
    
  };
  // build mongoose query here
  getPointOfIntrestModel().insertMany(newPointOfInterestData);
  res.sendStatus(201);
});


module.exports = router;
