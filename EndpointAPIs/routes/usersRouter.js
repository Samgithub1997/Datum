const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Users = require("../models/users");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route("/")
.get((req, res, next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
            //   console.log(" ++ ++ ++ ++")
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Users.create(req.body)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        console.log("User created: ", user);
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusode = 403;
    res.end("Put operation unsupported!");
})
.delete((req, res, next) => {
    res.end("Deleting all Users");
    Users.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        console.log(resp);
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

userRouter.route("/:userId")
.get((req, res, next) => {
    Users.findById(req.params.userId)
          .then((users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json"); 
            res.json(users);
            res.end("Will GET you users");
          }, (err) => next(err))
          .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`Post operation not supported!`);
})
.put((req, res, next) => {
    // res.end(`Will update the user ${req.body.name} with details ${req.body.description}`);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    Users.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new : true })
    .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "appication/json");
        res.json(users);
        res.write(`Updating user to ${req.params.userId} \n`);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Users.findByIdAndRemove(req.params.userId)
          .then((resp) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "appication/json");
              res.json(resp);
              res.end("Deleting user " + req.params.userId);
          }, (err) => next(err))
          .catch((err) => next(err));
});

module.exports = userRouter;