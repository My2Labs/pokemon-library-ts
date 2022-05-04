const main = document.querySelector<HTMLDivElement>(".main")



type Ability = {
    ability: {
        name: string;
        url: string;
    }
}

// type Abilities = {
//     abilities: Ability[];
// }

type PokemonInfo = {
    name: string;
    sprites: {
        front_default: string;
    };
    weight: number;
    height: number;
    abilities: Ability[];
}



const pokemonDetails = document.createElement("div")
if (main) {
    main.append(pokemonDetails)
}

function addPokemonDetails(pokemon: PokemonInfo) {
    pokemonDetails.innerHTML = `
        <figure class="detail-figure">
            <img src=${pokemon.sprites.front_default} alt=${pokemon.name} class="detail-image" />
            <figcaption class="detail-figcaption">${pokemon.name}</figcaption>
        </figure>
        <h3>Weight: ${pokemon.weight}</h3>
        <h3>Height: ${pokemon.height}</h3>
        <h2>Abilities</h2>

    `
}

function addPokemonAbilities(pokemon: PokemonInfo) {
    const abilitiesList = document.createElement("ul")
    abilitiesList.classList.add("abilities")
    if (pokemonDetails) {
        pokemonDetails.append(abilitiesList)
    }
    Promise.all(pokemon.abilities
        .map(ability => ability.ability.url)
        .map(url => fetch(url)
            .then(response => response.json())))
        .then(responses => responses.forEach(response => {
            const li = document.createElement("li")
            li.innerHTML = `
                <span class="ability-name">${response.name}</span>
                <span class="ability-short-description">${response.effect_entries.find(effect => {
                return effect.language.name === "en"
            }).short_effect}</span>
            `
            if (abilitiesList) {
                abilitiesList.append(li)
            }
        }))
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

fetch(`https://pokeapi.co/api/v2/pokemon/${urlParams.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
        addPokemonDetails(parsedResponse)
        addPokemonAbilities(parsedResponse)
    }).catch(error => {
        const p = document.createElement("p")
        p.textContent = "You blacked out!"
        main.append(p)
    })