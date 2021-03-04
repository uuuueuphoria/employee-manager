//import data, /api/departments
// /api/departments/name/training
//base url will change herokuapp.name.app/api/departments

window.addEventListener('load', function (e) {
  const departments = 'http://localhost:5000/api/departments';
  const training = 'http://localhost:5000/api/departments/name/training';
  fetch(departments)
    .then((req) => req.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  fetch(training)
    .then((req) => req.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});
