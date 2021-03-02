const express = require('express');

//handles all your http verbs
//handle /api/departments
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    //use controller MVC Model employees, views ejs, controller
    //build the data _View SSR
    //return json client side rendered
    res.send('return all employee');
  });
  return router;
};
