const {load} = require('csv-load-sync');
const path = require('path');


function getData(filename){
    return load(path.join(__dirname, `../public/csv/${filename}.csv`));
}

function fetchDataBetweenDate(start,end){

}

function fetchDataByID(compteurID){
    const counter = getData("compteurs");
    let counterID = undefined
    for (let i = 0; i < counter.length; i++) {
        if(counter[i].id === compteurID){
            counterID = counter[i]
        }
    }
}
module.exports = 'all functions'