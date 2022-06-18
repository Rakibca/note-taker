const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;
const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));


// returns the notes.html file when '/notes' is accessed.
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



// reads db.json file and return all saved notes as JSON.
app.get('/api/notes', function(req, res) {
  //let notes = ;
  res.json(JSON.parse(fs.readFileSync('./db/db.json', 'utf8')));
});


///////////////////////////////
// receives a new note to save on the request body, add it to the db.json file,
// and then return the new note to the client.
//const notesDatabase = require('./db/db.json');

app.post('/api/notes', function(req, res) {


    let userNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    //id: uuid.v4()
  };

  const notesDatabase = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  notesDatabase.push(userNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesDatabase, null, 2));
  res.json(notesDatabase);
});

// returns the index.html file when any other routes are accessed.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// app is now listening on port: 3001
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});
