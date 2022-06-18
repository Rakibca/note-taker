const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


module.exports = function(app) {
  // GET '/notes' returns the notes.html file
  app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });



  // GET '*' returns the index.html file
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};
