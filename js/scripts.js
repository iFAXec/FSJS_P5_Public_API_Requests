let employeesList = fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(result   => console.log(result))

    console.log(employeesList);

    