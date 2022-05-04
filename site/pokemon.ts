const main = document.querySelector<HTMLDivElement>(".main")



type Ability = {
    name: string;
    url: string;
}

type Abilities = {
    abilities: Ability[];
}

type PokemonData = {
    name: string;
    sprites: {
        front_default: string;
    };
    weight: number;
    height: number;
}


const url = `https://pokeapi.co/api/v2/pokemon/1`

const pokemonDetails = document.createElement("div")
main.append(pokemonDetails)

function addPokemonDetails(pokemon: PokemonData) {
    pokemonDetails.innerHTML = `
        <figure class="detail-figure">
            <img src=${pokemon.sprites.front_default} alt=${pokemon.name} class="detail-image" />
            <figcaption class="detail-figcaption">${pokemon.name}</figcaption>
        </figure>
        <h2>Abilities</h2>
        <h3>Weight: ${pokemon.weight}</h3>
        <h3>Height: ${pokemon.height}</h3>
    `

}


fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
        addPokemonDetails(parsedResponse)
    }).catch(error => {
        const p = document.createElement("p")
        p.textContent = "You blacked out!"
        main.append(p)
    })