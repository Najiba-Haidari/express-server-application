const express = require("express");
const router = express.Router();
const instructions = require("../data/instructions");

router
    .route("/")
    .get((req, res) => {
        res.json(instructions)
    })

module.exports = router;