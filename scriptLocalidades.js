document.addEventListener("DOMContentLoaded", () => {
    let currentPage = "https://rickandmortyapi.com/api/location"; 
    const container = document.getElementById("cards-container");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    function localidades(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarLocalidades(data.results);

            // Deshabilitar botones si no hay próxima o anterior
            prevPageButton.parentElement.classList.toggle("disabled", !data.info.prev);
            nextPageButton.parentElement.classList.toggle("disabled", !data.info.next);

            // Página siguiente y anterior
            prevPageButton.dataset.url = data.info.prev;
            nextPageButton.dataset.url = data.info.next;

            }) 
            .catch(error => console.error("Error al cargar las localidades:", error));
    }

    function mostrarLocalidades(location) {

    
        container.innerHTML = "";
        location.forEach(location => {
            const card = document.createElement('div');
            card.className = 'card col-md-4 col-12 m-3 p-0'
            card.style.maxWidth = '400px'
            card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title" id="tituloPrincipal">${location.name}</h4>
                                <p class="card-text">Type: ${location.type}</p>
                                <p class="card-text">Dimension: ${location.dimension}</p>
                                <p class="card-text">Residents: ${location.residents.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }


// Event listeners para los botones para pasar página
prevPageButton.addEventListener("click", () => {
    const url = prevPageButton.dataset.url;
    if (url) localidades(url);
});

nextPageButton.addEventListener("click", () => {
    const url = nextPageButton.dataset.url;
    if (url) localidades(url);
});

//Carga las cards en la página
    localidades(currentPage);

});
