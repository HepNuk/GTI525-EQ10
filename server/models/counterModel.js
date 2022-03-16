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

function createCountersData(){
    countersModel.create(getData("compteurs")).then(r => console.log("Add counters data successful"));
}

function getCounterModel(){
    return countersModel
}
module.exports = {getCounterModel,createCountersData}