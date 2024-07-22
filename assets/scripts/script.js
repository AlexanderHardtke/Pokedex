const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

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

function render(pokemon) {
    let type1 = pokemon.types[0].type;
    let type2 = pokemon.types.length > 1 ? pokemon.types[1].type : { name: "" };
    let weight = formatDecimals(pokemon['weight']);
    let height = formatDecimals(pokemon['height']);
    renderPokemon(pokemon, type1, type2, weight, height);
    colorCard(pokemon, type1);
}

function formatDecimals(i) {
    let formatDecimals = (i / 10).toFixed(1).replace('.', ',');
    return formatDecimals;
}

function renderPokemon(i, type1, type2, weight, height) {
    document.getElementById('content').innerHTML += /*html*/`
    <div class="pokeBox">
        <div class="card" id="card${i['id']}">
            <h2 class="name">#${i['id']} ${i['name']}</h2>
            <img class="pokeGIF" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${i['id']}.gif">
            <div class="types">
                <div>${type1['name']}</div>
                <div>${type2['name']}</div>
            </div>
            <div class="stats">
                <div>Weight: ${weight} Kilo</div>
                <div>Height: ${height} Meter</div>
            </div>
        </div>
    </div>
        `
}

function colorCard(card, i) {
    let color = i['name'];
    let colorcode;
    switch (color) {
        case "fire", "dragon":
            colorcode = "#f26e57";
            break;
        case "grass", "bug":
            colorcode = "#9acc50";
            break;
        case "water":
            colorcode = "#f266b8";
            break;
        case "poison":
            colorcode = "#b97fc9";
            break;
        case "electric":
            colorcode = "#edd434";
            break;
        case "ground":
            colorcode = "#f7df40";
            break;
        case "fairy":
            colorcode = "#fcb8e8";
            break;
        case "fighting":
            colorcode = "#d66722";
            break;
        case "psychic":
            colorcode = "#f266b8";
            break;
        case "rock":
            colorcode = "#a38b21";
            break;
        case "ghost":
            colorcode = "#7b62a3";
            break;
        case "ice":
            colorcode = "#b97fc9";
            break;
        default:
            colorcode = "#a5adb0";
            break;
    }
    document.getElementById(`card${card['id']}`).style.backgroundColor = colorcode;
}

function showPokedex() {
    document.getElementById('pokeOverlay').classList.add('showPokeOverlay');
}

function hidePokedex() {
    document.getElementById('pokeOverlay').classList.remove('showPokeOverlay');
}
// To-Dos:Nur ca 20 Pokemon laden, dann lade Mehr Button, Farbe von Karte nach Typ spezifizieren, beim Öffnen: stats, Entwicklung, nächstes Pokemon, PokedexOG,, 