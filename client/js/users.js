window.addEventListener('load', function (e) {
  const xhttp = new XMLHttpRequest();

  //fetch api endpoint to get user data
  xhttp.open(
    'GET',
    'https://test-employee-manager.herokuapp.com/api/v1/users',
    false
  );
  xhttp.send();
  console.log(xhttp);

  //parse the data into users

  const users = JSON.parse(xhttp.responseText);

  //display each user using template literal
  for (let user of users) {
    const x = `        
                    <br/>
                    <h2>${user.fullName}: ${user.id}</h2>
                   
                    <br/>
                    <br/>
        

                    <div>Login Email: ${user.email}</div>
                    <br/>
                    <br/>
                    <div>Login Password: ${user.password}</div>
                    <br/>

                    <hr>
  
    `;

    document.querySelector('.users').innerHTML =
      document.querySelector('.users').innerHTML + x;
  }
  console.log(users);
});
