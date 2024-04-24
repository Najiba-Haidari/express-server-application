const express = require("express");
const router = express.Router();

const exercises = require("../data/exercises");

router
    .route("/")
    .get((req, res) => {
        res.json(exercises)
    })

module.exports = router;