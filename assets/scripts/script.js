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
    showLoadingSpinner();
    for (let i = 1; i < 31; i++) {
        let realIndex = index + i;
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + realIndex)
        let pokemon = await response.json();
        render(pokemon, realIndex);
    }
    hideLoadingSpinner();
}

function init() {
    fetchPokeAPI(index);
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('showPokeOverlay');
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('showPokeOverlay');
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

function colorCard(card, i) {
    let color = i['name'];
    let colorCode = colors[color];
    document.getElementById(`card${card['id']}`).style.backgroundColor = colorCode;
}

function moreButton() {
    index += 30;
    if (index == 120) {
        document.getElementById('buttonBox').innerHTML = /*html*/`
        `
    }
    fetchPokeAPI(index)
}

function openPokedex(i) {
    showPokedex();
    fetchPokemon(i);
}

async function fetchPokemon(i) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
    let pokemon = await response.json();
    renderPokedexImg(pokemon);
    colorPokedex(pokemon);
    renderPokedexName(pokemon);
    renderPokedexStats(pokemon);
    renderInfoButtons(i);
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

function renderPokedexStats(i) {
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

function colorPokedex(i) {
    let type = i.types[0].type;
    let color = type['name'];
    let colorCode = colors[color];
    document.getElementById('screen').style.backgroundColor = colorCode;
}

function showPokedex() {
    document.getElementById('overlay').classList.add('showPokeOverlay');
}

function hidePokedex() {
    if (event.target.id === 'overlay' || event.target.id === 'backExitButton') {
        document.getElementById('overlay').classList.remove('showPokeOverlay');
    }
}

function renderInfoButtons(i) {
    document.getElementById('evolutionButton').setAttribute('onclick', 'showEvolutions(' + i + ')');
}

function showEvolutions(i) {
    fetchPokeEvolution(i);
}

async function fetchPokeEvolution(i) {
    let responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    let species = await responseSpecies.json();
    let evolutionURL = species.evolution_chain.url;
    let evolution = await fetch(evolutionURL);
    let evolutionChain = await evolution.json();
    fetchEvolvedPokemons(evolutionChain);
}

async function fetchEvolvedPokemons(i) {
    let urls = [
        i.chain.species.url,
        i.chain.evolves_to[0] ? i.chain.evolves_to[0].species.url : null,
        i.chain.evolves_to[0] && i.chain.evolves_to[0].evolves_to[0] ? i.chain.evolves_to[0].evolves_to[0].species.url : null
    ];
    document.getElementById('barBox').innerHTML = ``;
    for (let i = 0; i < urls.length; i++) {
        try {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + extractNumberFromUrl(urls[i]));
            let pokemon = await response.json();
            renderEvolution(pokemon);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}


// function extractNumberFromUrl(url) {
//     const parts = url.split('/').filter(Boolean);
//     const number = parts[parts.length - 1];
//     return number;
// }

function extractNumberFromUrl(url) {
    let match = url.match(/\/(\d+)\//);
    return match ? match[1] : null;
}

function renderEvolution(pokemon) {
    document.getElementById('barBox').innerHTML += /*html*/`
        <div class="evolutionBox"><img src="${pokemon.sprites.front_default}"></div>
    `
}

// if (!evolution) {
//     document.getElementById('blackInfoBox').innerHTML = /*html*/`
//         Keine Evolution gefunden
//     `
// }

// let debounceTimeout;
// document.getElementById('search').addEventListener('input', function() {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//         performSearch(this.value);
//     }, 300);
// });

// function performSearch(i) {
//     if (i.length >= 3) {
//         const results = Object.keys(colors).filter(color => color.includes(query.toLowerCase()));
//         results.forEach(result => {
//             li.textContent = result + ' - ' + colors[result];
//             resultsContainer.appendChild(li);
//         });

//         if (results.length === 0) {
//             const li = document.createElement('li');
//             li.textContent = 'Keine Ergebnisse gefunden';
//             resultsContainer.appendChild(li);
//         }
//     }
// }

// Filter-Funktion(Suche), Language maybe