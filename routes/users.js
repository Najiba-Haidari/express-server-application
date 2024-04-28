const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path")
const error = require("../utilities/error.js")
const readFile = require("../utilities/readFile.js")
const fs = require("fs")
const usersFilePath = (path.join(__dirname, '../data/users.js'))

router
    .route("/")
    // to get the users in front end through ejs template
    .get((req, res, next) => {
        fs.readFile(usersFilePath, 'utf-8', (err, data) => {
            if (err) {
                console.error("Error reading users file:", err);
                next(error(500, "Internal Server Error"));
                return;
            }
            try {
                const users = JSON.parse(data);
                res.render("users", { users: users }); // Render EJS template
            } catch (parseErr) {
                console.error("Error parsing users data:", parseErr);
                next(error(500, "Internal Server Error"));
            }
        });
    })
    // .get((req, res) => {
    //     res.json(users);
    // })
    .post((req, res, next) => {
        if (req.body.name && req.body.username && req.body.email) {
            fs.readFile(usersFilePath, "utf-8", (readErr, data) => {
                if (readErr) {
                    console.error("Error reading users file:", readErr);
                    next(error(500, "Internal Server Error"));
                    return;
                }
                try {
                    const users = JSON.parse(data);
                    const foundUser = users.find((u) => u.username == req.body.username);
                    if (foundUser) {
                        next(error(409, "Username is Already Taken, use another username!"));
                        return;
                    }
                    const newUser = {
                        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email
                    };
                    users.push(newUser);
                    fs.writeFile(usersFilePath, JSON.stringify(users, null, 4), (writeErr) => {
                        if (writeErr) {
                            console.error("Error writing users file:", writeErr);
                            next(error(500, "Internal Server Error"));
                        } else {
                            console.log("Successfully posted");
                            res.render("users", { users: users });
                        }
                    });
                } catch (parseErr) {
                    console.error("Error parsing users data:", parseErr);
                    next(error(500, "Internal Server Error"));
                }
            });
        } else {
            next(error(400, "Please enter all required data!"));
        }
    });


router
    .route("/:id")
    .get((req, res, next) => {
        readFile(usersFilePath, (err, users) => {
            if (err) {
                console.error("Error reading file in /:id")
            }
            const userId = req.params.id;
            const user = users.find((u) => u.id == userId)
            if (user) {
                res.json(user)
            } else {
                next()
            }
        })

    })
    .patch((req, res, next) => {
        readFile(usersFilePath, (err, users) => {
            if (err) {
                console.error("Error reading file in /:id")
            }
            const user = users.find((u, i) => {
                if (u.id == req.params.id) {
                    for (const key in req.body) {
                        users[i][key] = req.body[key];
                    }
                    fs.writeFile(usersFilePath, JSON.stringify(users, null, 4), (writeErr) => {
                        if (writeErr) {
                            console.error("Error writing users file:", writeErr);
                            return next(error(500, "Internal Server Error"));
                        }
                        console.log("Successfully updated");
                    }

                    )
                    return true;
                };
            })
            if (user) {
                res.json(user)
            } else {
                next();
            }

        })
    })
    .delete((req, res, next) => {
        readFile(usersFilePath, (err, users) => {
            if (err) {
                console.error("Error reading file in /:id")
            }
            const user = users.find((u, i) => {
                if (u.id == req.params.id) {
                    users.splice(i, 1)
                }
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 4), (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing users file:", writeErr);
                        return next(error(500, "Internal Server Error"));
                    }
                    console.log("Successfully deleted");
                })
                return true;
            })
            if (user) {
                res.json(user)
            } else {
                next()
            }
        })
    })

module.exports = router;