const { Router } = require('express');
const router = Router();
const {getFountainModel} = require('../../models/fountainModel')


router.get('/', (req, res) => {
    getFountainModel().find({},function (err,docs){
        console.log("TEST")
        res.status(200).send(docs)
    })
});

module.exports = router;