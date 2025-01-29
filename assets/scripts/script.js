/**
 * This function gets all arrays from the next 30 Pokemon into an Array
 * While this function is loading you activate showLoadingSpinner()
 * 
 * @param {number} index - This number is the index-Number of all Pokemon that are already loaded
 * 
 */

async function fetchPokeAPI(index) {
    showLoadingSpinner();
    for (let i = 1; i < 31; i++) {
        let realIndex = index + i;
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + realIndex)
        let pokemon = await response.json();
        getPokemonInfo(pokemon, realIndex);
    }
    hideLoadingSpinner();
}

/**
 * This function initializes after loading the body of the Web-page
 * 
 */
function init() {
    fetchPokeAPI(index);
}

/**
 * This function shows the loading screen and hinders all the interactions from the user to the page
 * 
 */
function showLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('showOverlay');
    document.body.classList.add('noScroll');
}

/**
 * This function hides the loading screen and reactivates all the interactions from the user to the page
 * 
 */
function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('showOverlay');
    document.body.classList.remove('noScroll');
}

/**
 * This function gets the type of Pokemon out of the array and checks if it has a secondary type, it also converts the height and weight into decimals
 * 
 * @param {Array} pokemon 
 */
function getPokemonInfo(pokemon) {
    let type1 = pokemon.types[0].type;
    let type2 = pokemon.types.length > 1 ? pokemon.types[1].type : { name: "" };
    let weight = formatDecimals(pokemon['weight']);
    let height = formatDecimals(pokemon['height']);
    renderPokemon(pokemon, type1, type2, weight, height);
    colorCard(pokemon, type1);
}

/**
 * This function takes the parameter divides it by 10 and returns it with a , instead of .
 * 
 * @param {number} i 
 * @returns {string}
 */
function formatDecimals(i) {
    let formatDecimals = (i / 10).toFixed(1).replace('.', ',');
    return formatDecimals;
}

/**
 * This function gets the 
 * 
 * @param {Array} card 
 * @param {string} i 
 */
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
    renderInfoButtons(i);
}

async function fetchPokemon(i) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
    let pokemon = await response.json();
    renderPokedexImg(pokemon);
    colorPokedex(pokemon);
    renderPokedexName(pokemon);
    renderPokedexStats(pokemon);
}

function colorPokedex(i) {
    let type = i.types[0].type;
    let color = type['name'];
    let colorCode = colors[color];
    document.getElementById('screen').style.backgroundColor = colorCode;
}

function showPokedex() {
    if (!hasPlayed) {
        hasPlayed = true;
        beat.volume = 0.1
        beat.play();
    }
    document.getElementById('overlay').classList.add('showOverlay');
    document.body.classList.add('noScroll');
}

function hidePokedex() {
    if (event.target.id === 'overlay' || event.target.id === 'backExitButton') {
        document.getElementById('overlay').classList.remove('showOverlay');
        document.body.classList.remove('noScroll');
        hasPlayed = false;
    }
}

async function showStats(i) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
    let pokemon = await response.json();
    renderPokedexStats(pokemon);
}

async function showEvolutions(i) {
    showLoadingScreen()
    await fetchPokeEvolution(i);
    hideLoadingScreen()
}

function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('showOverlay');
    document.getElementById('barBox').classList.add('displayNone');
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('showOverlay');
    document.getElementById('barBox').classList.remove('displayNone');
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
    for (let j = 0; j < urls.length; j++) {
        try {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + extractNumberFromUrl(urls[j]));
            let pokemon = await response.json();
            renderEvolution(pokemon);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

function extractNumberFromUrl(url) {
    let parts = url.split('/').filter(Boolean);
    let number = parts[parts.length - 1];
    if (number > 150) {
        return;
    }
    return number;
}

function nextPokemon(i) {
    if (i < 150) {
        i++;
        openPokedex(i);
    }
    else return;
}

function lastPokemon(i) {
    if (i > 1) {
        i--;
        openPokedex(i);
    }
    else return;
}

function increasePokeScreen() {
    const image = document.getElementById('pokeScreen');
    if (currentScale >= 1.5) {
        currentScale = 1;
    } else {
        currentScale += 0.2;
    }
    image.style.transform = `scale(${currentScale})`;
}

function decreasePokeScreen() {
    const image = document.getElementById('pokeScreen');
    if (currentScale <= 0.5) {
        currentScale = 1;
    } else {
        currentScale -= 0.2;
    }
    image.style.transform = `scale(${currentScale})`;
}

function searchPokemonNames(input) {
    input = input.toLowerCase();
    let cards = document.getElementsByClassName('pokeBox');
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const id = card.id.toLowerCase();
        if (input.length >= 3) {
            if (id.includes(input)) {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'inline-block';
        }
    }
}

let debounceTimeout;
document.getElementById('search').addEventListener('input', function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        searchPokemonNames(this.value);
    }, 300);
});