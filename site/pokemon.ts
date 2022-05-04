const main = document.querySelector<HTMLDivElement>(".main")

export { }

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

function titleCase(string: string) {
    return string.toLowerCase().split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
}

const pokemonDetails = document.createElement("div")
if (main) {
    main.append(pokemonDetails)
}

function addPokemonDetails(pokemon: PokemonInfo) {
    pokemonDetails.innerHTML = `
        <figure class="detail-figure">
            <img src=${pokemon.sprites.front_default} alt=${pokemon.name} class="detail-image" />
            <figcaption class="detail-figcaption">${titleCase(pokemon.name)}</figcaption>
        </figure>
        <div class="pokemon-details">
            <h3>Weight: ${pokemon.weight}</h3>
            <h3>Height: ${pokemon.height}</h3>
        </div>
    `
}

function addPokemonAbilities(pokemon: PokemonInfo) {
    const abilitiesList = document.createElement("ul")
    abilitiesList.classList.add("abilities")
    abilitiesList.innerHTML = `
        <h2>Abilities</h2>
    `
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
                <span class="ability-name">${titleCase(response.name)}</span>
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
        const loading = document.querySelector(".loading")
        loading.classList.add("hidden")
    })
    .catch(error => {
        const p = document.createElement("p")
        p.textContent = "You blacked out!"
        main.append(p)
        console.error(error.message)
    })