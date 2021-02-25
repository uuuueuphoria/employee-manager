// require dotenv package to read the properties in the .env file.
// never upload .env file to git.
require('dotenv').config();
//import the express module
const express = require('express');
// import the path utils from Node.
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');

// Importing our Login Service Used With the POST Login Route
const loginService = require('./services/loginService');
const { rename } = require('fs');

// create an instance of express
const app = express();

// read the value of PORT NODE_EVN variable in the .env file
// when the index.js file starts up this file is read in and
// we can set configuration variables for the application.
// never upload to git...
const PORT = process.env.PORT || 5000;

// Middleware For Cross Origin Resource SHaring
app.use(cors());

//To get access to the name value pairs send in the message Body of POST Request.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting up the cookie session
app.use(
  cookieSession({
    name: 'session',
    keys: ['r8y4jkw9093hl1nd02', '380sl230flkadg3225fsdd'],
  })
);

// Setup Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//Middleware Serving Static Pages from client directory
// second parameter is an configuration object of how we want
// the static file server to run.

app.use(
  express.static(path.join(__dirname, '../client'), {
    extensions: ['html', 'htm'],
  })
);

app.get('/dashboard', (req, res) => {
  if (req.session.isValid) {
    res.render('dashboard');
  } else {
    res.sendFile(path.join(__dirname, './client/index.html'));
  }
});

// Routing Middleware.
// login route.
// Access Form Data uses the POST method from the req body.
// Tell Express that you want to access POST Request body
// Setup   app.use(express.urlencoded({extended:true}))

app.get('/login', (req, res) => {
  // user template placed inside the views directory
  // res.render(view, data)   ejs.render(template, {data})
  res.render('login', {
    passwordWarning: '',
    emailWarning: '',
    email: '',
    password: '',
  });
});
app.post('/login', (req, res) => {
  // if your incomming name value pairs are alot then create an object
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  const isValidUser = loginService.authenticate(credentials);
  if (isValidUser.user !== null) {
    //cookieSession isValid session
    if (!req.session.isValid) {
      req.session.isValid = true;
    }
    res.render('dashboard');
  }
  if (isValidUser.user === null) {
    //render the login with warnings
    res.render('login', {
      emailWarning: isValidUser.emailWarning,
      passwordWarning: isValidUser.passwordWarning,
      email: req.body.email,
      password: req.body.password,
    });
  }

  res.end();
});

app.post('/login', (req, res) => {
  // POST name value pairs in body request
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  const isValidUser = loginService.authenticate(credentials);

  res.end();
});

// Final Middleware
// Catch all for any request not handled while express was
// processing requests.
// Returns 404 Page from the client directory.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

// Tell express app to listen for incomming request on a specific PORT
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
