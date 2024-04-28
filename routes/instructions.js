const express = require("express");
const router = express.Router();
const instructions = require("../data/instructions");
const error = require("../utilities/error.js");
const exercises = require("../data/exercises");

router
    .route("/")
    //api/instructions?userId=<value>
    .get((req, res, next) => {
        const instructionUserId = req.query.userId;
        // res.send(instructionUserId)
        if (instructionUserId) {
            const foundInstruction = exercises.filter((ins) => ins.userId == instructionUserId)
            res.json(foundInstruction);
        }
        else next();
    })
    //api/instructions
    .get((req, res) => {
        res.json(instructions)
    })
    .post((req, res, next) => {
        if (req.body.userId && req.body.exerciseId && req.body.content) {
            const foundInstruction = instructions.find((ins) => ins.exerciseId == req.body.exerciseIdId);
            if (foundInstruction) {
                next(error(409, "Exercise Id is already given instruction"))
            }
            const instruction = {
                id: exercises[exercises.length - 1].id + 1,
                userId: req.body.userId,
                exerciseId: req.body.exerciseId,
                content: req.body.content
            }
            instructions.push(instruction);
            res.json(instructions[instructions.length - 1])
        } else {
            next(error(400, "Please all required data!"))
        }
    })

router
    .route("/:id")
    .get((req, res, next) => {
        const instructionId = req.params.id;
        const foundInstruction = instructions.find((ins) => ins.id == req.params.id)
        if (foundInstruction) {
            res.json(foundInstruction)
        } else {
            next();
        }
    })
    .patch((req, res, next) => {
        const instruction = instructions.find((ins, i) => {
            if (ins.id == req.params.id) {
                for (const key in req.body) {
                    instructions[i][key] = req.body[key]
                }
                return true;
            }
        });
        if (instruction) {
            res.json(instruction)
        } else {
            next();
        }
    })
    .delete((req, res, next) => {
        const instruction = instructions.find((ins, i) => {
            if (ins.id == req.params.id) {
                instructions.splice(i, 1);
                return true;
            }
        })
        if (instruction) {
            res.json(instruction)
        } else {
            next()
        }
    })

module.exports = router;