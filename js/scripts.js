const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";
const galleryDiv = document.getElementById("gallery");
let employees = [];



fetch(url)
    .then(response => response.json())
    //.then(result => console.log(result))        
    .then(data => {
        employees = data.results;
        employees.map((item, index) => generateHTML(item, index));
    })    
    //.catch(error => console.error("Error:", error))

    


    //Helper function which generate html within the card
    function generateHTML(item, index) {
            const img = item.picture.large;
            const name = item.name;
            const email = item.email;
            const city = item.location.city;
            const state = item.location.state;            

             

            const html = `
            <div class="card" data-index=${index}> 
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
    function emptyModal() {       
        const htmlModal = `
        <div class="modal-container data-index="" style = "display:none">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="" alt="profile picture">
                        <h3 id="name" class="modal-name cap"></h3>
                        <p class="modal-text"></p>
                        <p class="modal-text cap"></p>
                        <hr>
                        <p class="modal-text"></p>
                        <p class="modal-text"></p>
                        <p class="modal-text"></p>
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

    function updateModal(employee, index) {
        const modalContainer = document.querySelector(".modal-container");       
        modalContainer.setAttribute("data-index", employee.index);

        const image = modalContainer.querySelector(".modal-img");        
        image.src = employee.picture.large;
        image.alt = "profile picture";

        const name = document.querySelector("#name");
        name.textContent = employee.name;

        const email = modalContainer.querySelector(".modal-text");
        email = employee.email

        const cap = modalContainer.querySelector(".cap");
        cap = employee.city;
        
        modalContainer.style.display = block;        
        
    }

updateModal();



document.addEventListener("click", (e)=>{
        const target = e.target.closest(".card");
        const index = target.getAttribute("data-index");  
        console.log(index);
        employee = employees[index];
        console.log(employee);     
        updateModal(employee);
        
    })  

    
    
    
    











