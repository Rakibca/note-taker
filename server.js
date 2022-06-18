const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


require('./apiRoutes')(app);
require('./htmlRoutes')(app);


app.listen(PORT, () =>
  console.log(`Note Taker App listening at http://localhost:${PORT} 🚀`)
);
