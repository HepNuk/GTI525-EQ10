const mongoose = require("mongoose");
const {getData} = require("../src/parseData.js");
const {getHeader} = require("../src/parseData");
const fs = require("fs");
const path = require("path");
const {mongoUri} = require("../config");
const {getCounterModel} = require("./counterModel");
// const {getCounterModel} = require("./counterModel")

const dataStatsModel = mongoose.model("DataStats", mongoose.Schema({
    Date: String,
    100041114: Number,
    100002880: Number,
    100003032: Number,
    100003034: Number,
    100003039: Number,
    100003040: Number,
    100003041: Number,
    100003042: Number,
    100004575: Number,
    100007390: Number,
    100011747: Number,
    100011748: Number,
    100011783: Number,
    100012217: Number,
    100012218: Number,
    100017441: Number,
    100017523: Number,
    100025474: Number,
    100034805: Number,
    100035408: Number,
    100035409: Number,
    100041101: Number,
    100001753: Number,
    100047030: Number,
    100052600: Number,
    100052601: Number,
    100052602: Number,
    100052603: Number,
    100052604: Number,
    100052605: Number,
    100052606: Number,
    100053055: Number,
    100053057: Number,
    100053058: Number,
    100053059: Number,
    100053210: Number,
    100054073: Number,
    100055268: Number,
    100056188: Number,
    100057050: Number,
    100057051: Number,
    100057052: Number,
    100057053: Number,
    100057500: Number,
    38: Number,
    39: Number,
    100053209: Number,
    100054241: Number,
    100054585: Number,
    300014916: Number,
    300014994: Number,
    300014993: Number,
    300014986: Number,
    300014985: Number,
    300014995: Number,
    300014996: Number,
}))

// const counter_header = getHeader("counter_stats_2018")
const counter_header = "Date,Berri1,Boyer,Boyer 2,Brébeuf,Christophe-Colomb,CSC (Côte Sainte-Catherine),Eco-Display Parc Stanley,Eco-Display - Métro Laurier,Edmond Valade,Gouin / Lajeunesse,2,3,Notre-Dame,Parc,Pierre-Dupuy,Pont Jacques-Cartier,Rachel / Hôtel de Ville,Rachel / Papineau,René-Lévesque,Saint-Antoine,Saint-Laurent/Bellechasse,Saint-Urbain,Viger"
const new_header = "Date,100003032,100012218,100035408,100004575,100035409,100003041,100041114,100007390,100041101,100034805,2,3,100001753,100003042,100003040,100002880,100012217,100003034,100011748,100011747,100025474,100017523,100047030"

// let tmp = ['Date'];

function createCounterStatsData() {

// getCounterModel().find({}, function (err, docs) {
//     if (err) {
//         console.log(err);
//     }
//     for (let i = 1; i < counter_header.length; i++) {
//         for (let j = 0; j < docs.length; j++) {
//             if (docs[j]['Nom'] === (counter_header[i])) {
//                 console.log("First:" + docs[j]['Nom']);
//                 tmp.push(docs[j]['ID']);
//                 break;
//             } else if (((docs[j]['Ancien_ID']) === parseInt(counter_header[i]))) {
//                 console.log("Second:" + counter_header[i]);
//                 tmp.push(docs[j]['ID']);
//                 break;
//             } else if (docs[j]['Nom'].substring(0, counter_header[i].length) === counter_header[i]) {
//                 console.log("Third:" + counter_header[i]);
//                 tmp.push(docs[j]['ID']);
//                 break;
//             }
//         }
//     }
//     console.log(tmp)
//     fs.readFile(path.join(__dirname, `../public/csv/counter_stats_2018.csv`), 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         let result = data.replace(counter_header, new_header);
//         fs.writeFile(path.join(__dirname, `../public/csv/counter_stats_2018.csv`), result, 'utf8', function (err) {
//             // if (err) return console.log(err)
//
//             let result = data.replace(new_header, counter_header);
//             //
//             fs.writeFile(path.join(__dirname, `../public/csv/counter_stats_2018.csv`), result, 'utf8', function (err) {
//                 if (err) return console.log(err);
//             });
//         });
//     });
// })
    dataStatsModel.collection.insertMany(getData("counter_stats_2018")).then(r => console.log("Data 2018 successful"))
    dataStatsModel.collection.insertMany(getData("counter_stats_2019")).then(r => console.log("Data 2019 successful"));
    dataStatsModel.collection.insertMany(getData("counter_stats_2020")).then(r => console.log("Data 2020 successful"));
    dataStatsModel.collection.insertMany(getData("counter_stats_2021")).then(r => console.log("Data 2021 successful"));
}

function getDataStatsModel() {
    return dataStatsModel
}


module.exports = {getDataStatsModel,createCounterStatsData}