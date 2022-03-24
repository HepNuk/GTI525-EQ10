const { Router } = require('express');
const moment = require('moment');
const mongoose = require('mongoose');

const router = Router();

// GET /gti525/v1/pointsdinteret
router.get('/', (req, res) => {
  const { limite, type, nom } = req.params;

  const query = {};

  if (type === 'fontaine') {
    // build mongoose query here
  } else if (type === 'atelier') {
    // build mongoose query here
  } else {
    // build mongoose query here
  }

  // getPointOfInterestModel().find(query).exec((err, result) => {
    res.status(200).send({ something: 'hi' });
  // });
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
  
  // build mongoose query here

  res.sendStatus(201);
});


module.exports = router;
