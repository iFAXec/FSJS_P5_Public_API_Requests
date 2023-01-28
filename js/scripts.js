let employeesList = fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error("Error:", error))

    //console.log(employeesList);

    