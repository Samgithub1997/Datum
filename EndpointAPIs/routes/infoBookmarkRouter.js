const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const infoBookmark = require("../models/infoBookmark");

var infoBookmarkRouter = express.Router();

infoBookmarkRouter.use(bodyParser.json());

infoBookmarkRouter.route("/")
.get((req, res, next) => {
  // Show all folders content
  infoBookmark.find({ user_id : req.body.user_id})
  .exec()
  .then((info) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(info);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  // create a folder
  infoBookmark.create(req.body)
  .then((info) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log("InfoBook created: ", info);
      res.json(info);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusode = 403;
  res.end("Put operation unsupported!");
})
.delete((req, res, next) => {
  res.end("Deleting all Info");
  infoBookmark.remove({ user_id : req.body.user_id})
  .exec()
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log(resp);
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

infoBookmarkRouter.route("/:infoFolderId")
.get((req, res, next) => {
  // Display contents of a particular information folder 
  infoBookmark.findById(req.params.infoFolderId)
    .then((info) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json"); 
    res.json(info);
    res.end("Will GET you info");
  }, (err) => next(err))
  .catch((err) => next(err)); 
})
.post((req, res, next) => {
  // add info to infoFolder
  infoBookmark.findById(req.params.infoFolderId)
  .then((infoFolder) => {
    if(infoFolder != null){
      infoFolder.contentList.push(req.body);
      // infoFolder.tags.push(req.body.tags);
      infoFolder.save()
      .then((infoFolder) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(infoFolder);
      }, (err) => next(err))
    }else{
      err = new Error(`Info Folder ${req.params.infoFolderId} not found!`);
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end(`PUT operation is not supported by /infoFolder/${req.params.infoFolderId}/comments`);
})
.delete((req, res, next) => {
  // delete a info folder
  infoBookmark.findById(req.params.infoFolderId)
  .then((infoFolder) => {
    if(infoFolder != null){
      for(var j = (infoFolder.contentList.length - 1); j >= 0; j--){
        infoFolder.contentList.id(infoFolder.contentList[j]._id).remove();
      }
      for(var j = (infoFolder.tags.length - 1); j >= 0; j--){
        infoFolder.tags.id(infoFolder.tags[j]._id).remove();
      }
      infoFolder.save()
      .then((info) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(info);
      }, (err) => next(err));
    }else{
      err = new Error(`infoFolder ${req.params.infoFolderId} not found!`);
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});

infoBookmarkRouter.route("/:infoFolderId/tag")
.post((req, res, next) => {
  // add info to infoFolder
  infoBookmark.findById(req.params.infoFolderId)
  .then((infoFolder) => {
    if(infoFolder != null){
      infoFolder.tags.push(req.body);
      infoFolder.save()
      .then((infoFolder) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(infoFolder);
      }, (err) => next(err))
    }else{
      err = new Error(`InfoList ${req.params.infoFolderId} not found!`);
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end(`PUT operation is not supported by /infoList${req.params.infoListhId}/comments`);
})
.delete((req, res, next) => {
  // delete tag under info list with "tag_id" in request header
  infoBookmark.findById(req.params.infoFolderId)
  .then((infoFolder) => {
    if(infoFolder != null){
      infoFolder.tags.id(req.body.tag_id).remove();
      infoFolder.save()
      .then((info) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(info);
      }, (err) => next(err));
    }else{
      err = new Error(`infoFolder ${req.params.infoFolderId} not found!`);
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = infoBookmarkRouter;
