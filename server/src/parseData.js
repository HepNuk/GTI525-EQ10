const {load} = require('csv-load-sync');
const path = require('path');


function getData(filename) {
    return load(path.join(__dirname, `../public/csv/${filename}.csv`));
}

function fetchDataBetweenDate(compteurId, start, end) {
    const start_year = start.slice(0, 4);
    const start_month = start.slice(4, 6);
    const start_day = start.slice(6, 8);

    const end_year = end.slice(0, 4);
    const end_month = end.slice(4, 6);
    const end_day = end.slice(6, 8);

    let count_array = [];
    let label_array = [];

    for (let i = parseInt(start_year); i <= parseInt(end_year); i++) {
        let tmp_array = getData("counter_stats_" + i);
        let sum = 0;
        let current_date = start_year+"-"+start_month+"-"+start_day;
        for (let j = 0; j < tmp_array.length; j++) {
            let check_day = (tmp_array[j]['Date'].split('-')[2]).split(" ")[0]
            let check_month = tmp_array[j]['Date'].split('-')[1]

            if ((parseInt(check_month) >= start_month && parseInt(check_month) <= end_month)
                && (parseInt(check_day) >= start_day && parseInt(check_day) <= end_day)) {

                if (current_date === i + "-" + check_month + "-" + check_day) {
                    if (start_year === "2018") {
                        sum += parseInt(tmp_array[j][getKeyFromID(compteurId)]);
                    } else {
                        sum += parseInt(tmp_array[j][compteurId]);
                    }
                } else {
                    label_array.push(current_date);
                    count_array.push(sum);
                    sum = 0;
                    if (start_year === "2018") {
                        sum += parseInt(tmp_array[j][getKeyFromID(compteurId)]);
                    } else {
                        sum += parseInt(tmp_array[j][compteurId]);
                    }
                    current_date = i + "-" + check_month + "-" + check_day
                }
            }
        }
        label_array.push(current_date);
        count_array.push(sum);
    }
    return {
        "label": label_array,
        "count": count_array
    }
}

function getKeyFromID(compteurID) {
    const counter = getData("compteurs");
    let counterName = "";
    for (let i = 0; i < counter.length; i++) {
        if (counter[i].ID === compteurID) {
            counterName = counter[i].Nom;
        }
    }
    return counterName
}

module.exports = {getData, fetchDataBetweenDate}