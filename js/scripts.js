const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";
const galleryDiv = document.getElementById("gallery");
let employees = [];


/*  
* fetch data of 12 employees using the url
* Data  to fetch are Image, First and Last Name, Email and City oo location
* check status 
* parse the response and map over the data to dislay the employee card
*/

fetch(url)
    .then(checkStatus)
    .then(response => response.json())              
    .then(data => {
        employees = data.results;
        console.log(employees);
        employees.map((item, index) => displayCard(item, index));
    })    
    .catch(error => console.error("Error:", error))

/**
 * The function checks the response received using the fetch command
 * @param {response} response 
 * Check if he respose is ok
 * @returns response
 */

    function checkStatus(response) {
        if (response && response.ok) {
            return response;              
        } 
    }
    
    /**
     * Create a helper function which takes two para
     * @param {property} item is employee property in the object
     * @param {index} index of the employee
     * Creates the html elements using template literals
     */

    //Helper function which generate html within the card
    function displayCard(item, index) {
            const img = item.picture.large;
            const name = item.name;
            const email = item.email;
            const city = item.location.city;
            const state = item.location.state;          

            const html = `
            <div class="card" data-index=${index} data-first=${item.name.first.toLowerCase()} data-last=${item.name.last.toLowerCase()} > 
            <div class="card-img-container">
                <img class="card-img" src= ${img} alt = profile picture of ${name.first} ${name.last}>
            </div>
            <div class="card-info-container">    
                <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>                
            </div>    
            </div>
            `            
            //console.log(galleryDiv);
            //console.log(html);
            galleryDiv.insertAdjacentHTML("beforeend", html);        
    }



/**
 * Helper function which create a html template of the modal
 * Appends the html to the DOM 
 */    
    function createModal() {
        const htmlModal = `
             <div class="modal-container" data-index="" style = "display:none" >
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img id = "img" class="modal-img" src="" alt="profile picture">
                        <h3 id = "name" class="modal-name cap"></h3>
                        <p id = "email" class="modal-text"></p>
                        <p id = "city" class="modal-text cap"></p>
                        <hr>
                        <p id ="cell" class="modal-text"></p>
                        <p id ="address" class="modal-text"></p>
                        <p id = "dob" class="modal-text"></p>
                    </div>
                </div>
                
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `       
        galleryDiv.insertAdjacentHTML("afterend", htmlModal);
    }

    createModal();

/**
 * Function to generate the modal which a card is clicked
 * and attaches to each element in of the DOM to create the modal
 */

function generateModal (){
    const modalImg = document.querySelector(".modal-img");
    const modalName = document.querySelector(".modal-name");
    const modalEmail = document.querySelector(".modal-text");         
    const modalCity = document.querySelectorAll(".modal-text.cap")[0];
    const modalCell = document.querySelectorAll(".modal-text")[2];  
    const modalAdress = document.querySelectorAll(".modal-text")[3];
    const modalBirthday = document.querySelectorAll(".modal-text")[4]; 
    
    //Convert the cell number in (XXX) XXX-XXXX format 
    const empoyeeCell = employee.cell;
    const number = empoyeeCell.replace(/\D/g, '');
    const match = number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    //convert the date to dd/mm/yyyy format
    const employeeDoB = employee.dob.date; // get the date of dob from the object    
    const date = new Date(employeeDoB);     
    const Birthday = date.toLocaleDateString("en-GB"); 
    //console.log(Birthday);

    modalImg.src = employee.picture.large;
    modalImg.alt = `Profile picture of ${employee.name.first} ${employee.name.last}`;    
    modalName.innerHTML = `${employee.name.first} ${employee.name.last}`;
    modalEmail.innerHTML= employee.email;
    modalCity.innerHTML = employee.location.city;
    modalCell.innerHTML = match;
    modalAdress.innerHTML = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}`;
    modalBirthday.textContent = "Birthday:" + Birthday; //textContent and innerHTML can also be used to update text within the tags

}

/**
 * Event listen to close the modal when "x" is clicked
 */
const modalContainer = document.querySelector(".modal-container");
const closeModal = document.getElementById("modal-close-btn");

  closeModal.addEventListener("click", ()=>{
    modalContainer.style.display = "none";    
  });    

/**
 * Helper function to dislay the modal
 */

    function displayModal(){   
    modalContainer.style.display = "block";   
    modalContainer.style.backgroundColor="#EDF2E6";
    generateModal();    
    
}

/**
 * Event listener to display the modal when the card is clicked
 * Event delegation to target the card
 * Obtain index value and display the modal 
 */

galleryDiv.addEventListener("click", (e)=>{
    const target = e.target.closest(".card");
    const index = target.getAttribute("data-index");  
    employee = employees[index];        
    //console.log(index);
    console.log(employee);             
    displayModal();       
});


//<----Search Functionality ---->

const searchContainer = document.querySelector(".search-container");

/**
 * Function creates html elements for search 
 * Appends to the DOM
 * @returns the html
 */

function searchHTML() {
    let html = "";
    html = `
        <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>   
    `;    
    searchContainer.insertAdjacentHTML("beforeend", html)
    return html;
}

let searchBar = searchHTML();
//console.log(searchBar);

/** 
 * Event listener to check the employee name
 * Sorts the card as the name is typed
 */
searchContainer.addEventListener("keyup", searchCardName);
document.getElementById("search-submit").addEventListener("click", searchCardName);

/**
 * Helper function to check the name entered in the search box matches with that of the card
 * Sorts and displays the card of the employee with matching name
 */
function searchCardName() {
       const searchInput = document.querySelector("#search-input");
        const searchValue = searchInput.value.toLowerCase();   
        const employeeCardsContainers = document.querySelectorAll(".card");            
        for (const employeeCard of employeeCardsContainers) {
            const firstName = employeeCard.getAttribute("data-first");
            const lastName = employeeCard.getAttribute("data-last");
            if (firstName.includes(searchValue) || lastName.includes(searchValue)) {
                employeeCard.style.display = "flex";                                
            } else {
                employeeCard.style.display = "none";  
                
            }
                    
        }    
}

//<-----Change the modal when prev and next button is clicked----->
// function changeModal(index){
//     const {picture: {large}, name: {first, last}, email, cell, dob: {date}, location: {city, state, country, postcode}} = employees[index];
//     modalContainer.setAttribute("data-index", index);   

//     document.getElementById("img").src = picture.large;    
//     document.getElementById("name") = `${first} ${last}`;
//     document.getElementById("email") = email;
//     document.getElementById("city") = `${city}`;
//     document.getElementById("cell") = cell;
//     document.getElementById("address") = `${country}`;
//     document.getElementById("dob") = `${date}`;
// }

// const prevModal = document.getElementById("modal-prev");
// const nextModal = document.getElementById("modal-next");
// let modalIndex;
// prevModal.addEventListener("click", (e)=>{     
//     modalIndex = parseInt(getAttribute("data-index"));
//     //console.log(modalIndex);
//     changeModal(modalIndex); 
// });
