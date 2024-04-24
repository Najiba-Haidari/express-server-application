const express = require("express");

const userRoutes = require("./users");
const exerciseRoutes = require("./exercises");
const instructionRoutes = require("./instructions");

const app = express();

app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/instructions", instructionRoutes);

module.exports = app;