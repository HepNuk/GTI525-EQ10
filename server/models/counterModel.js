const mongoose = require("mongoose");
const {getData} = require("../src/parseData.js");
const countersModel = mongoose.model("Counters",mongoose.Schema({
    ID:Number,
    Ancien_ID:Number,
    Nom:String,
    Statut:String,
    Latitude:Number,
    Longitude:Number,
    Annee_implante:Number,
}))

countersModel.collection.drop()
const counterTable = countersModel.create(getData("compteurs"));

function getCounterModel(){
    return countersModel
}
module.exports = {getCounterModel}