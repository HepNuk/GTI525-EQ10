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

const {getData} = require('./src/parseData.js');
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

const Counters = mongoose.model("Counters",mongoose.Schema({
    ID:Number,
    Ancien_ID:Number,
    Nom:String,
    Statut:String,
    Latitude:Number,
    Longitude:Number,
    Annee_implante:Number,
}))

const Fountains = mongoose.model("Fountains",mongoose.Schema({
    ID:Number,
    Arrondissement:String,
    Nom_parc_lieu:String,
    Proximité_jeux_repère:String,
    Intersection:String,
    Etat:String,
    Date_installation:String,
    Remarque:String,
    Precision_localisation:String,
    X:Number,
    Y:Number,
    Longitude:Number,
    Latitude:Number,
}))
// // For later if they make us use a DB
mongoose
    .connect(mongoUri)
    .then((db) => {
        console.log('Connection to MongoDB is successful.');
        Counters.create(getData("compteurs"));
        // Fountains.create(getData("fontaines"));
        
        Counters.find({},function (err,data){
            if (err){console.log(err)};
            console.log(data)
        })

    })
    .catch((err) => console.log(err));

// const conn = mongoose.connection;
// conn.collection("Counters").drop()
// // conn.collection("Fountains").drop()
// // conn.collection("DataStats").drop()
// conn.collection("Counters").insertMany(getData("compteurs"))
// conn.collection("Fountains").insertMany(getData("fontaines"))
//
// conn.collection("DataStats").insertMany(getData("counter_stats_2018"))


// conn.collection("DataStats").insertMany(getData("counter_stats_2019"))
// conn.collection("DataStats").insertMany(getData("counter_stats_2020"))
// conn.collection("DataStats").insertMany(getData("counter_stats_2021"))
// // *************

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
