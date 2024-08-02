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
let currentScale = 1;

function renderPokemon(i, type1, type2, weight, height) {
    document.getElementById('content').innerHTML += /*html*/`
    <div class="pokeBox" id="${i['name']}">
        <div class="card" id="card${i['id']}" onclick="openPokedex(${i['id']})">
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

function renderPokedexImg(i) {
    document.getElementById('screen').innerHTML = /*html*/`
        <img id="pokeScreen" class="pokeScreen" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i['id']}.png">
    `
}

function renderPokedexName(i) {
    let type1 = i.types[0].type;
    let type2 = i.types.length > 1 ? i.types[1].type : { name: "" };
    document.getElementById('greenInfoBox').innerHTML = /*html*/`
        <p>${i['name']}</p>
        <p>${type1['name']}</p>
        <p>${type2['name']}</p>
    `
}

function showStats(i) {
    document.getElementById('barBox').innerHTML = /*html*/`
    <div>Stats:</div>
    <div class="bar" style="height: ${i.stats[0].base_stat}%;" stat="${i.stats[0].base_stat}">HP<br></div>
    <div class="bar" style="height: ${i.stats[1].base_stat}%;" stat="${i.stats[1].base_stat}">ATK<br></div>
    <div class="bar" style="height: ${i.stats[2].base_stat}%;" stat="${i.stats[2].base_stat}">DEF<br></div>
    <div class="bar" style="height: ${i.stats[3].base_stat}%;" stat="${i.stats[3].base_stat}">SpA<br></div>
    <div class="bar" style="height: ${i.stats[4].base_stat}%;" stat="${i.stats[4].base_stat}">SpD<br></div>
    <div class="bar" style="height: ${i.stats[5].base_stat}%;" stat="${i.stats[5].base_stat}">SPE<br></div>
    `
}

function renderEvolution(pokemon) {
    document.getElementById('barBox').innerHTML += /*html*/`
        <div class="evolutionBox" onclick="openPokedex(${pokemon.id})"><img src="${pokemon.sprites.front_default}">${pokemon.species.name}</div>
    `
}

function renderInfoButtons(i) {
    document.getElementById('statButton').setAttribute('onclick', 'showStats(' + i + ')');
    document.getElementById('evolutionButton').setAttribute('onclick', 'showEvolutions(' + i + ')');
    document.getElementById('dPadLeft').setAttribute('onclick', 'lastPokemon(' + i + ')');
    document.getElementById('dPadRight').setAttribute('onclick', 'nextPokemon(' + i + ')');
}