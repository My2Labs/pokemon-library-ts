const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50`
const div = document.querySelector<HTMLDivElement>("div")

fetch(pokeApiUrl)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
