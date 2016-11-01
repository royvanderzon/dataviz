// server.js
global.__base = __dirname + '/';

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();

const port     = process.env.PORT || 3000; //8080
const flash    = require('connect-flash');
const path 	 = require('path');

const functions 	    	 = require('./functions');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const multer  	 = require('multer');

const file = require('file-system');
const fs = require('fs');
const csv = require("fast-csv");

// Routes
const profileRoutes = require('./app/profileRoutes');

// Uploaden
const upload = multer({dest: 'public/uploads/'});
// Puplic
app.use(express.static('public')); // to add CSS

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// Ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
// app.use(session({ secret: '2345yubv54b64u5b6by45g63byi46nkhbtb4h65hyj' })); // session secret
app.use(session({
  secret: 'fun289r2H(*)&$H#*(897j49r(*H&RF',
  saveUninitialized: true,
  resave: false
}));

app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/rootRoutes.js')(app);

// other routes ================================================================
app.use('/profile', profileRoutes);

// launch ======================================================================
app.listen(port);
console.log('SOCIALSCOUT started on port: ' + port);