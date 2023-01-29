fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    //.then(result => console.log(result))        
    .then(data => {
        data.results.map(item => generateHTML(item))
    })    
    //.catch(error => console.error("Error:", error))

    


    //Helper function which generate html within the card
    function generateHTML(item) {
            const img = item.picture.large;
            const name = item.name;
            const email = item.email;
            const city = item.location.city;
            const state = item.location.state;            

            const galleryDiv = document.getElementById("gallery"); 

            const html = `
            <div class="card"> 
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


const employeeCard = document.getElementsByClassName("card");
//console.log(employeeCard);



    function generateModal(para) {
        const img = para.picture.large;
        const name = para.name;
        const email = para.email;
        const city = para.location.city;
        const cell = para.cell;
        const location = para.location;
        const birthday = para.dob;


        const htmlModal = `
        <class="modal-container">        
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src=${img} alt= profile picture of ${name.first}>
        <h3 id="name" class="modal-name cap">${name}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${cell}</p>
        <p class="modal-text">${location}</p>
        <p class="modal-text">Birthday: ${birthday}</p>        
        </div>       
        </div>
        </div>        
        `   
        modalDiv.insertAdjacentHTML("beforeend", htmlModal);     

    }
    const modalDiv = document.getElementsByClassName("modal-container");
    console.log(modalDiv);
    console.log(generateModal(data));











