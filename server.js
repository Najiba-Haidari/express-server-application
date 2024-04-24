const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path")
const app = express();
const port = 3000;

const apiRouter = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, 'public')));

// app.engine("ejs", ejs);
app.set("views", "./views");
app.set("view engine", "ejs")

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server listening on port: http://127.0.0.1:${port}/`)
})

