const express = require('express');
const Department = require('../controllers/Department');
//handles all your http verbs
//handle /api/departments
const router = express.Router();
const departmentController = new Department('../data/employees.json');

//common js modules
module.exports = () => {
  router.get('/', (req, res) => {
    //use controller MVC Model employees, views ejs, controller
    //build the data _View SSR
    //return json client side rendered
    const departments = departmentController.getDepartments();
    res.send(departments);
  });

  //single department
  //get request (body)
  router.get('/name/:name', (req, res) => {
    //res.send({ params: req.params, query: req.query });
    const department = departmentController.getDepartmentByName(
      req.params.name
    );
    res.send(department);
  });
  return router;
};
