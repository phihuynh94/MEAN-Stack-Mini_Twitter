const userRouter = require("express").Router();
const User = require("../models/user.model");
const passport = require("passport");
const auth = require("../config/auth");
const _ = require("lodash");

userRouter.post("/signup", (req, res, next) => {
  let user = new User();
  user.fullName = req.body.fullName;
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save((err, user) => {
    if (!err) {
      res.send(user);
    } else {
      if (err.code == 11000)
        if (err.keyPattern.email)
          res.status(422).send(["Duplicate email adrress found."]);
        else res.status(422).send(["Duplicate username found"]);
      else return next(err);
    }
  });
});

userRouter.post("/authenticate", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    else return res.status(404).json(info);
  })(req, res);
});

userRouter.get("/getUser", auth, (req, res) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res.status(200).json({
        status: true,
        user: _.pick(user, ["id", "fullName", "email", "username"]),
      });
  });
});

userRouter.get("/getUsers", (req, res) => {
  User.find((err, users) => {
    if (!users) return res.send("No users found.");
    else if (users) return res.send(users);
    else return res.send(err);
  });
});

userRouter.put("/updateUser", auth, (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (!err) {
        res.send(user);
      } else {
        res.send(err);
      }
    }
  );
});

userRouter.put("/changePassword/:token", auth, (req, res) => {
  let user = new User();
  user = req.body;

  console.log(user);

  // User.findOneAndUpdate({ _id: user.id }, { $set: user }, (err, user) => {
  //   if (!err) {
  //     res.send(user);
  //   } else {
  //     res.send(err);
  //   }
  // });
});

module.exports = userRouter;
