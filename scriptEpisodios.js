document.addEventListener("DOMContentLoaded", () => {
    let currentPage = "https://rickandmortyapi.com/api/episode"; 
    const container = document.getElementById("cards-container");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    function episodios(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarEpisodios(data.results);

            // Deshabilitar botones si no hay próxima o anterior
            prevPageButton.parentElement.classList.toggle("disabled", !data.info.prev);
            nextPageButton.parentElement.classList.toggle("disabled", !data.info.next);

            // Página siguiente y anterior
            prevPageButton.dataset.url = data.info.prev;
            nextPageButton.dataset.url = data.info.next;

            }) 
            .catch(error => console.error("Error al cargar las episodios:", error));
    }

    function mostrarEpisodios(episode) {

    
        container.innerHTML = "";
        episode.forEach(episode => {
            const card = document.createElement('div');
            card.className = 'card col-md-4 col-12 m-3 p-0'
            card.style.maxWidth = '400px'
            card.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title" id="tituloPrincipal">${episode.name}</h4>
                                <p class="card-text">Air date: ${episode.air_date}</p>
                                <p class="card-text">Episode: ${episode.episode}</p>
                                <p class="card-text">Characters in this episode: ${episode.characters.length}</p>
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
    if (url) episodios(url);
});

nextPageButton.addEventListener("click", () => {
    const url = nextPageButton.dataset.url;
    if (url) episodios(url);
});

//Carga las cards de la página
    episodios(currentPage);

});
