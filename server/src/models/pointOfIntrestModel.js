const mongoose = require("mongoose");
const {getData} = require("../utils/parseData.js");
const { customAlphabet } = require('nanoid/non-secure');

const pointOfIntrestModel = mongoose.model("PointOfIntrests", mongoose.Schema({
    ID: {
        type: Number,
        index: { unique: true },
    },
    Arrondissement: String,
    Nom_parc_lieu: String,
    Proximité_jeux_repère: { type: String, default: '' },
    Intersection: { type: String, default: '' },
    Etat: { type: String, default: '' },
    Date_installation: { type: String, default: '' },
    Remarque: { type: String, default: '' },
    Precision_localisation: { type: String, default: '' },
    X: { type: Number, default: null },
    Y: { type: Number, default: null },
    Longitude: Number,
    Latitude: Number,
    Type: { type: String, default: 'Fontaine à boire' },
}));

async function createPointOfIntrestData() {
    await pointOfIntrestModel.insertMany(getData("fontaines"));
    console.log("Add fountains successfully");
}

function getPointOfIntrestModel() {
    return pointOfIntrestModel;
}

module.exports = { createPointOfIntrestData, getPointOfIntrestModel };