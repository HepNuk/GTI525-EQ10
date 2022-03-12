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
const {getFountainModel} = require("./models/fountainModel")
const {getCounterModel} = require("./models/counterModel")
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


// For later if they make us use a DB
mongoose
    .connect(mongoUri)
    .then((db) => {
        console.log('Connection to MongoDB is successful.')
        console.log(getCounterModel())
        console.log(getFountainModel())
    })
    .catch((err) => console.log(err));

// * API ROUTES * app.use('/api/routes', routeObject)
// example routes : 
// http://localhost:8000/api/test_route/
// http://localhost:8000/api/test_route/route2
app.use('/gti525/v1/compteurs', routeCompteur);
app.use('/gti525/v1/fontaines', routeFountain);

// ***

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
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
