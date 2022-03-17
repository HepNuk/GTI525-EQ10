const mongoose = require("mongoose");
const {getData} = require("../src/parseData.js");

const fountainsModel = mongoose.model("Fountains", mongoose.Schema({
    ID: Number,
    Arrondissement: String,
    Nom_parc_lieu: String,
    Proximité_jeux_repère: String,
    Intersection: String,
    Etat: String,
    Date_installation: String,
    Remarque: String,
    Precision_localisation: String,
    X: Number,
    Y: Number,
    Longitude: Number,
    Latitude: Number,
}))

function createFountainsData() {
    fountainsModel.collection.insertMany(getData("fontaines")).then(r => console.log("Add fountains successfully"));
}

function getFountainModel() {
    return fountainsModel
}

module.exports = {getFountainModel,createFountainsData}