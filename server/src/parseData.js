const {load} = require('csv-load-sync');
const path = require('path');
const moment = require('moment')


function getData(filename) {
    return load(path.join(__dirname, `../public/csv/${filename}.csv`));
}

function fetchDataBetweenDate(compteurId, start, end) {

    let count_array = [];
    let label_array = [];
    let array = [];
    for (let i = parseInt(start.slice(0, 4)); i <= parseInt(end.slice(0, 4)); i++) {
        try {
            let tmp_array = getData("counter_stats_" + i);
            for (let j = 0; j < tmp_array.length; j++) {
                array.push(tmp_array[j]);
            }
        } catch (err) {
        }
    }
    label_array = getAllDate(start, end);
    count_array = getCounterCountByDate(start, end, array, compteurId);
    return {
        "label": label_array,
        "count": count_array,
        "name":getKeyFromID(compteurId)
    };
}

function getDateArray(array) {
    let date_array = [];
    for (let i = 0; i < array.length; i++) {
        date_array.push(array[i]['Date']);
    }
    return date_array;
}

function getCounterCountByDate(start, end, tmp_array, compteurID) {
    let array = []
    let start_date = createNewDate(start);
    let date_array = getDateArray(tmp_array);
    start_date.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    })
    let end_date = createNewDate(end)
    end_date.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    })
    let sum = 0;
    let i = 0;
    while (start_date <= end_date) {
        let next_day = moment(start_date).add(1, 'days');
        let value = 0;
        while (start_date < next_day) {
            const tmp_date = moment(start_date).format('YYYY-MM-DD HH:mm:ss');
            if (date_array.includes(tmp_date)) {
                const year = moment(start_date).format('YYYY');
                try {
                    if (year === "2018") {
                        value = parseInt(tmp_array[i][getKeyFromID(compteurID)]);
                    } else {
                        value = parseInt(tmp_array[i][compteurID]);
                    }
                }catch (err){}
            }
            if (isNaN(value)) {
                value = 0;
            }
            sum += value;
            start_date = moment(start_date).add(1, 'hours');
            i++;
        }
        array.push(sum);
        sum = 0;
    }
    return array;
}

function createNewDate(date) {
    const start_year = date.slice(0, 4);
    const start_month = date.slice(4, 6);
    const start_day = date.slice(6, 8);

    let new_date = new Date(start_year + "-" + start_month + "-" + start_day);
    return moment(new_date).add(1, 'days');
}

function getAllDate(start, end) {

    let array = [];
    let start_date = createNewDate(start);
    let end_date = createNewDate(end)

    while (start_date <= end_date) {
        array.push(moment(start_date).format('YYYY-MM-DD'))
        start_date = moment(start_date).add(1, 'days')
    }
    return array;
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