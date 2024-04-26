const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const users = require("../data/users.js");
const error = require("../utilities/error.js")

router
    .route("/")
    //to get the users in front end through ejs template
    // .get((req, res) => {
    //     // res.json(users);
    //     res.render("users", { users:users})
    // })
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res, next) => {
        if (req.body.name && req.body.username && req.body.email) {
            const foundUser = users.find((u) => u.username == req.body.username)
            if (foundUser) {
                next(error(409, "Username is Already Taken, use another username!"))
            }
            const user = {
                id: users[users.length - 1].id + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            }
            users.push(user);
            res.json(users[users.length - 1]);
        } else {
            next(error(400, "Please enter all required data!"))
        }
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const userId = req.params.id;
        const user = users.find((u) => u.id == userId)
        if (user) {
            res.json(user)
        } else {
            next()
        }
    })
    .patch((req, res, next)=> {
        const user = users.find((u, i)=> {
            if (u.id == req.params.id){
                for (const key in req.body){
                    users[i][key] = req.body[key];
                }
                return true;
            }
        });
        if (user){
            res.json(user)
        } else {
            next();}
    })
    .delete((req, res, next)=> {
        const user = users.find((u, i)=> {
            if (u.id == req.params.id){
                users.splice(i, 1)
                return true;
            }
          
        })
        if (user){
            res.json(user)
        } else{
            next()
        }
    })

module.exports = router;