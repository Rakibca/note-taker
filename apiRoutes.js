const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


module.exports = function(app) {
  // GET '/api/notes' reads the db.json file and returns all saved notes as JSON
  app.get('/api/notes', function(req, res) {
    let notesDb = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notesDb);
  });


  // POST '/api/notes' receives a new note to save on the request body.
  // Adds it to the db.json file.
  // Then returns the new note to the client.
  app.post('/api/notes', (req, res) => {
    const noteNew = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4()
    };
    let notesDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notesDb.push(noteNew);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesDb, null, 2));
    res.json(notesDb);
  });


  // Adds a DELETE route to this application
  app.delete(`/api/notes/:id`, (req, res) => {
    let notesDel = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notesDel = notesDel.filter(notesDel => notesDel.id.toString() !== req.params.id.toString());
    fs.writeFileSync('./db/db.json', JSON.stringify(notesDel, null, 2));
    res.json(notesDel);
  });
};
