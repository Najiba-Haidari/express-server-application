const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path")
const app = express();
const port = 3000;
// const bootstrap = require('bootstrap');

const apiRouter = require("./routes/index.js");
const error = require("./utilities/error");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//custom middleware for logging info
app.use((req, res, next)=>{
  console.log(req.method +" Request Received at ", new Date())
  next()
})
//api routes
app.use("/api", apiRouter);

//server static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// app.engine("ejs", ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res)=> {
  res.send("Visit /api/users for Users \n /api/exercises for Exercises")
})

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

//Middleware for error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server listening on port: http://127.0.0.1:${port}/`)
})

