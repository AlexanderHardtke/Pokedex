const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	fairy: '#D685AD',
};

let index = 0;

async function fetchPokeAPI(index) {
    for (let i = 1; i < 31; i++) {
        let realIndex = index + i;
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + realIndex)
        let pokemon = await response.json();
        render(pokemon, realIndex);
    }
}

function init() {
    fetchPokeAPI(index);
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
    let colorCode = colors[color];
    document.getElementById(`card${card['id']}`).style.backgroundColor = colorCode;
}

function moreButton() {   
    index += 30;
    if (index == 120){
        document.getElementById('buttonBox').innerHTML = /*html*/`
        `
    }
    fetchPokeAPI(index)

}

function showPokedex() {
    document.getElementById('pokeOverlay').classList.add('showPokeOverlay');
}

function hidePokedex() {
    document.getElementById('pokeOverlay').classList.remove('showPokeOverlay');
}
// beim Öffnen: stats, Entwicklung, nächstes Pokemon, PokedexOG, Suchfunktion, 