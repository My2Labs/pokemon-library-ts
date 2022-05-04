const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50`
const div = document.querySelector<HTMLDivElement>("div")
const pokemon = document.querySelector<HTMLUListElement>(".pokemon")


type PokemonList = {
    results: Pokemon[];
}

type Pokemon = {
    name: string;
    url: string;
}

type PokemonData = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

function titleCase(string: string) {
    return string.toLowerCase().split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
}

fetch(pokeApiUrl)
    .then(response => response.json())
    .then((allPokemon: PokemonList) => {
        console.log(allPokemon)
        const urls: string[] = allPokemon.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    })
    .then(responses => {
        responses.forEach(response => {
            addPokemonListing(createPokemonListing(response))
        })
        const loading = document.querySelector(".loading")
        loading.classList.add("hidden")
    })


function createPokemonListing(pokemon: PokemonData) {
    const li = document.createElement("li")
    li.innerHTML = `
        <div class="pokemon-listing">
            <a href="pokemon.html?pokemon=${pokemon.id}"><figure>
                <img src=${pokemon.sprites.front_default} alt=${pokemon.name} />
                <figcaption>${titleCase(pokemon.name)}</figcaption>
            </figure></a>
        </div>
    `
    return li
}

function addPokemonListing(listing: HTMLLIElement) {
    pokemon.append(listing)
}