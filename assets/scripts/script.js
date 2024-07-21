async function fetchDataPokeAPI() {
    for (let i = 1; i < 151; i++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
        let pokemon = await response.json();
        render(pokemon, i);
    }
}

function init() {
    fetchDataPokeAPI();
}

function render(pokemon, i) {
    let pokeName = pokemon['name'];
    renderPokemon(pokeName, i);
}

function renderPokemon(name, i) {
    document.getElementById('content').innerHTML += /*html*/`
    <div class="pokeBox">
        <div class="dFlexColumn">
            <h2 class="name">#${i} ${name}</h2>
            <img class="pokeGIF" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${i}.gif">
        </div>
    </div>
        `
}

// To-Dos:Nur ca 20 Pokemon laden, dann lade Mehr Button, Farbe von Karte nach Typ spezifizieren, beim Öffnen: stats, Entwicklung, nächstes Pokemon, PokedexOG,, 