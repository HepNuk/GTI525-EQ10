const {load} = require('csv-load-sync');
const path = require('path');


function getData(filename) {
    return load(path.join(__dirname, `../public/csv/${filename}.csv`));
}

function fetchDataBetweenDate(start, end) {
    const start_year = start.slice(0, 4);
    const start_month = start.slice(4, 6);
    const start_day = start.slice(6, 8);

    const end_year = end.slice(0, 4);
    const end_month = end.slice(4, 6);
    const end_day = end.slice(6, 8);

    let array = []
    for (let i = parseInt(start_year); i <= parseInt(end_year); i++) {
        let tmp_array = getData("counter_stats_" + i);
        for (let j = 0; j < tmp_array.length; j++) {
            let check_day = (tmp_array[j]['Date'].split('-')[2]).split(" ")[0]
            let check_month = tmp_array[j]['Date'].split('-')[1]

            if ((parseInt(check_month) >= start_month && parseInt(check_month) <= end_month)
                && (parseInt(check_day) >= start_day && parseInt(check_day) <= end_day)) {
                array.push(tmp_array[j])
            }
        }
    }
    return array
}

function fetchDataByID(compteurID) {
    const counter = getData("compteurs");
    let counterID = 0
    for (let i = 0; i < counter.length; i++) {
        if (counter[i].id === compteurID) {
            counterID = counter[i]
        }
    }
}

module.exports = {getData, fetchDataBetweenDate, fetchDataByID}