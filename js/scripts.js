const url = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob"



fetch(url)
    .then(response => response.json())
    //.then(result => console.log(result))        
    .then(data => {
        data.results.map((item, index) => generateHTML(item, index))
    })    
    //.catch(error => console.error("Error:", error))

    


    //Helper function which generate html within the card
    function generateHTML(item, index) {
            const img = item.picture.large;
            const name = item.name;
            const email = item.email;
            const city = item.location.city;
            const state = item.location.state;            

            const galleryDiv = document.getElementById("gallery"); 

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


document.addEventListener("click", (e)=>{
    const target = e.target.closest(".card");
    const index = target.getAttribute("data-index");
    console.log(index);   

    
    console.log(generateModal(index));        
    
})

const body = document.getElementsByTagName("body");
//console.log(body);

    function generateModal(para) {
        const img = para.picture.large;
        const name = para.name;
        const email = para.email;
        const city = para.location.city;
        const cell = para.cell;
        const location = para.location;
        const birthday = para.dob;


        const htmlModal = `
        <div class="modal-container">        
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
        body.insertAdjacentHTML("beforeend", htmlModal);
        const modal = document.getElementsByClassName("modal-container");
        modal.style.display = "block"
    }

    
    
    
    











