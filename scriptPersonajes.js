document.addEventListener("DOMContentLoaded", () => {
    let currentPage = "https://rickandmortyapi.com/api/character"; 
    const container = document.getElementById("cards-container");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    function personajes(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarPersonajes(data.results);

            // Deshabilitar botones si no hay próxima o anterior
            prevPageButton.parentElement.classList.toggle("disabled", !data.info.prev);
            nextPageButton.parentElement.classList.toggle("disabled", !data.info.next);

            // Página siguiente y anterior
            prevPageButton.dataset.url = data.info.prev;
            nextPageButton.dataset.url = data.info.next;

            }) 
            .catch(error => console.error("Error al cargar los personajes:", error));
    }
    
        function isAlive(status){
            if(status === "Alive"){
                return '<i class="fa-solid fa-circle fa-2xs" style="color: #00ff2a;"></i>'
            }else{
                return '<i class="fa-solid fa-circle fa-2xs" style="color: #ff0000;"></i>'
            }
        }

    function mostrarPersonajes(characters) {

    
        container.innerHTML = "";
        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card col-md-6 col-12 m-3 p-0'
            card.style.maxWidth = '600px'
            card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${character.image}" class="img-fluid rounded-start" alt="${character.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title" id="tituloPrincipal">${character.name}</h4>
                                <p class="card-text">Status: ${character.status} ${isAlive(character.status)}</p>
                                <p class="card-text">Species: ${character.species}</p>

                                <p class="card-text">Origin: ${character.origin.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            //Evento para mostrar el modal
            card.addEventListener('click', () =>{
                mostrarModal(character);
            });

            container.appendChild(card);
        });
    }

function mostrarModal(character) {
    const modalImage = document.getElementById('modal-character-image');
    const modalName = document.getElementById('modal-character-name');
    const modalStatus = document.getElementById('modal-character-status');
    const modalSpecies = document.getElementById('modal-character-species');
    const modalGender = document.getElementById('modal-character-gender');
    const modalOrigin = document.getElementById('modal-character-origin');
    const modalLocation = document.getElementById('modal-character-location');
    const modalEpisode = document.getElementById('modal-character-episode');
    

    modalImage.src = character.image;
    modalImage.alt = character.name;
    modalName.textContent = `Name: ${character.name}`;
    modalStatus.textContent = `Status:  ${character.status},`;
    modalSpecies.textContent = `Specie: ${character.species}, ${character.type}`;
    modalGender.textContent = `Gender: ${character.gender},`;
    modalOrigin.textContent = `Origin: ${character.origin.name},`;
    modalLocation.textContent = `Location: ${character.location.name},`;
    modalEpisode.textContent = `Episodes where he appears: ${character.episode.length}`;
    

    const modal = new bootstrap.Modal(document.getElementById('characterModal'));
    modal.show();
}

// Event listeners para los botones para pasar página
prevPageButton.addEventListener("click", () => {
    const url = prevPageButton.dataset.url;
    if (url) personajes(url);
});

nextPageButton.addEventListener("click", () => {
    const url = nextPageButton.dataset.url;
    if (url) personajes(url);
});

//Carga los personajes de la página
    personajes(currentPage);

});
