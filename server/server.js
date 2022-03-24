require('dotenv').config();
const ENV = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const {PORT, mongoUri} = require('./config');
const {createCountersData} = require("./models/counterModel")
const {createFountainsData} = require("./models/fountainModel")
const {createCounterStatsData} = require("./models/dataStatsModel")
// Example route files DELETE later I guess when we have actual routes.
const routeCompteur = require('./routes/api/routeCompteur');
const routeFountain = require('./routes/api/routeFountain');

// If we use vue-router all of the routes from vue router should be included here. 
// Could use and filter the route from the vue-router file if possible. 
const vueRoutes = [
    '/',
    '/fountain',
    '/bike_repair',
    '/add_poi',
];

const pathToVueProdIndex = path.resolve(__dirname, 'public', 'index.html');
// sendFile handler for vue app's built for production index file.
const vueAppHandler = (req, res, next) => res.sendFile(pathToVueProdIndex);

app
    .use(cors())
    .use(morgan('tiny'))
    .use(bodyParser.json());

mongoose
    .connect(mongoUri)
    .then((mongoose) => {
        mongoose.connection.db.collection("counters").estimatedDocumentCount((err,count) => {
            if( count == 0) createCountersData();
            else console.log("No counters to add");
        });
        mongoose.connection.db.collection("fountains").estimatedDocumentCount((err,count) => {
            if(count == 0) createFountainsData();
            else console.log("No fountains to add");
        });
        mongoose.connection.db.collection("datastats").estimatedDocumentCount((err,count) => {
            if(count == 0) createCounterStatsData();
            else console.log("No stats to add");
        });
        console.log("Connection to MongoDB successful")
    })
    .catch((err) => console.log(err));

// * API ROUTES * app.use('/api/routes', routeObject)
app.use('/gti525/v1/compteurs', routeCompteur);
app.use('/gti525/v1/fontaines', routeFountain);

// ***

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
;
var limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
});

// apply rate limiter to all requests
app.use(limiter);

// If production (npm run start-linux or npm run start-windows)
if (ENV['NODE_ENV'] == 'production') {
    app.use(express.static('public'));
    // For each possible vue route (which can be multiple if using vue-router) set the handler on that route to serve the index.html
    vueRoutes.forEach((route) => app.get(route, vueAppHandler));
}

app.listen(PORT, () => {
    console.log((`Server App listening at http://localhost:${PORT}`));
});
