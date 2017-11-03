const express = require('express');
const router = express.Router();
var status = require('http-status');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gistology');
var Gist = require('../models/gist');


/* GET a gist by his ID. */
router.get('/gist/:gistId', (req, res) => {
  var gistId = req.params.gistId;

  // Check first if it is a valid Id
  if (!mongoose.Types.ObjectId.isValid(gistId)) {
    return res.status(400).send({
      message: 'Gist Id is invalid'
    });
  }

  Gist.findById(gistId, function(err, gistFounded) {
    if (err) return res.status(status.BAD_REQUEST).json(err);
    // We serve as json the gist founded
    res.status(status.OK).json(gistFounded);
  });
});

/* PUT: update a new gist */
router.put('/gist', (req, res) => {
  var data = req.body;
  var id = data._id;

  // Properties to update on an exiting gist
  var gistToUpdate = {
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    link: data.link
  };

  // find the gist with id :id
  Gist.findByIdAndUpdate(id, gistToUpdate, function(err, gist) {
    if (err) return res.status(status.BAD_REQUEST).json(err);

    // The gist has been updated
    res.status(status.OK).json(gistToUpdate);
  });
});

/* POST: save a new gist */
router.post('/gist', (req, res) => {
  var data = req.body;
  // create a new gist
  var newGist = Gist({
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    link: data.link
  });

  // save the gist
  newGist.save(function(err, gist) {
    if (err) return res.status(status.BAD_REQUEST).json(err);
    res.status(status.OK).json(gist);
  });
});

/* GET all saved gists */
router.get('/gist', (req, res) => {
  Gist.find({}, function(err, gists) {
    if (err) return res.status(status.BAD_REQUEST).json(err);

    // object of all the gists
    res.status(status.OK).json(gists);
  });
});

/* DELETE: delete a gist by id */
router.delete('/gist/:gistId', (req, res) => {
  var gistId = req.params.gistId;

  // find the gist by id and remove it
  Gist.findByIdAndRemove(gistId, function(err) {
    if (err) return res.status(status.BAD_REQUEST).json(err);

    // The gist has been deleted
    res.status(status.OK).json({message: 'SUCCESS'});
  });
});

module.exports = router;
