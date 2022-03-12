const mongoose = require("mongoose");
const {getData} = require("../src/parseData.js");

const dataStatsModel = mongoose.model("DataStats",mongoose.Schema({
    ID:Number,
    Arrondissement:String,
    Nom_parc_lieu:String,
    Proximité_jeux_repère:String,
    Intersection:String,
    Etat:String,
    Date_installation:String,
    Remarque:String,
    Precision_localisation:String,
    X:Number,
    Y:Number,
    Longitude:Number,
    Latitude:Number,
}))

dataStatsModel.collection.drop()
const dataStatsTable = dataStatsModel.create(getData("counter_stats_2018"));

function getDataStatsModel(){
    return dataStatsModel
}
module.exports = {getDataStatsModel}