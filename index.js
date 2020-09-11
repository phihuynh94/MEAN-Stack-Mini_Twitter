require("./backend/models/db");
require("./backend/config/passportConfig");

const config = require("./backend/config/config");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get("/", (req, res) => res.send("running"));

// routes
app.use("/user", require("./backend/controllers/user.controller"));
app.use("/tweet", require("./backend/controllers/tweet.controller"));

// error handler
app.use((err, res) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/dist/frontend"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "frontend", "index.html"));
  });
}

// app.use("/", express.static(path.join(__dirname, "./frontend/dist/frontend")));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "./frontend/dist/frontend", "index.html"));
// });

// start server
app.listen(config.port, () =>
  console.log(`Server started at port : ${config.port}`)
);
