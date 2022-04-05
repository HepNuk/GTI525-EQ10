const mongoose = require("mongoose");
const {getData} = require("../utils/parseData.js");
const countersModel = mongoose.model("Counters",mongoose.Schema({
    ID:Number,
    Ancien_ID:Number,
    Nom:String,
    Statut:String,
    Latitude:Number,
    Longitude:Number,
    Annee_implante:Number,
}))

async function createCountersData(){
    countersModel.insertMany(getData("compteurs"))
    console.log("Add counters data successful")
}

function getCounterModel(){
    return countersModel
}
module.exports = {getCounterModel,createCountersData}