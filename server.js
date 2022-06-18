const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Access htmlRoutes.js & apiRoutes.js
require('./apiRoutes')(app);
require('./htmlRoutes')(app);


// This allows the app to run at port 3001
app.listen(PORT, () =>
  console.log(`Note Taker App listening at http://localhost:${PORT} 🚀`)
);
