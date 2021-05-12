var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const Summary = require("../models/summary");
const axios = require("axios");

var summaryRouter = express.Router();

summaryRouter.use(bodyParser.json());

summaryRouter.route("/")
.get((req, res, next) => {
  Summary.find({ user_id : req.body.user_id, url: req.body.url})
  .exec()
  .then((summary) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
          //   console.log(" ++ ++ ++ ++")
      res.json(summary);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  var summary_content = "This is summary of article";
  axios.post('http://127.0.0.1:5000/resp', { req: req.body.content })
    .then((response) => {
    //console.log(response);
    summary_content = response.data.resp;
    
    // Create Summary
    Summary.create({
      user_id: req.body.user_id,
      url : req.body.url,
      content: req.body.content,
      summary: summary_content
    })
    .then((summaryJson) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log("Summary created: ", summaryJson);
      res.json(summaryJson);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .catch((err) => {next(err)});
})
.put((req, res, next) => {
  res.statusode = 403;
  res.end("Put operation unsupported!");
})
.delete((req, res, next) => {
  res.end("Deleting all Summaries");
  Summary.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log(resp);
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

summaryRouter.route("/:summaryId")
.get((req, res, next) => {
  Summary.findById(req.params.summaryId)
    .then((sum) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json"); 
    res.json(sum);
    res.end("Will GET you summary");
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end(`Post operation not supported!`);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end(`Post operation not supported!`);
})
.delete((req, res, next) => {
  Summary.findByIdAndRemove(req.params.summaryId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "appication/json");
            res.json(resp);
            res.end("Deleting summary " + req.params.summaryId);
        }, (err) => next(err))
        .catch((err) => next(err));
});


module.exports = summaryRouter;
