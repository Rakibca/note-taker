const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


module.exports = function (app) {


  // Adding note functions
  app.get('/api/notes', function(req, res) {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
  });

  // Make note
  app.post('/api/notes', (req, res) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4()
    };
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    res.json(notes);
  });

  //Delete note
  app.delete(`/api/notes/:id`, (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notes = notes.filter(notes => notes.id.toString() !== req.params.id.toString());
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    res.json(notes);
  });

};
