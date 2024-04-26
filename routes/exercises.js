const express = require("express");
const router = express.Router();

const exercises = require("../data/exercises");
const error = require("../utilities/error.js")

router
    .route("/")
    .get((req, res) => {
        res.json(exercises)
    })
    .post((req, res, next) => {
        if (req.body.userId && req.body.exerciseName && req.body.content) {
            const foundExercise = exercises.find((e) => e.exerciseName == req.body.exerciseName)
            if (foundExercise) {
                next(error(409, "Exercise Already Created!"))
            }
            const exercise = {
                id: exercises[exercises.length - 1].id + 1,
                userId: req.body.userId,
                exerciseName: req.body.exerciseName,
                content: req.body.content,
            }
            exercises.push(exercise)
            res.json(exercises[exercises.length - 1])
        } else {
            next(error(400, "Please enter all required data!"))
        }
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const exerciseId = req.params.id;
        const exercise = exercises.find((e) => e.id == exerciseId)
        if (exercise) {
            res.json(exercise)
        } else {
            next();
        }
    })
    .patch((req, res, next) => {
        const exercise = exercises.find((e, i) => {
            if (e.id == req.params.id) {
                //for in loop to iterate over properties of an object
                for (const key in req.body) {
                    exercises[i][key] = req.body[key]
                  
                }
                return true;
            }
        });
        if (exercise) {
            res.json(exercise)
        } else {
            next();
        }

    })
    .delete((req, res, next) => {
        const exercise = exercises.find((e, i) => {
            if (e.id == req.params.id) {
                exercises.splice(i, 1);
                return true;
            }

        })
        if (exercise) {
            res.json(exercise)
        } else {
            next();
        }
    })

module.exports = router;