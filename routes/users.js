const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const users = require("../data/users.js");

router
    .route("/")
    .get((req, res) => {
        res.json(users);
        // res.render("users", { users:users})
    })

module.exports = router;