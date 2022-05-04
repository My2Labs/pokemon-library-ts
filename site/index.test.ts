import { createPokemonListing } from "../site/index"
import { addPokemonListing } from "../site/index"
import { titleCase } from "../site/index"
// const createPokemonListing = require("../site/index")


describe("createPokemonListing", () => {
    it.only("should exist", () => {
        expect(createPokemonListing).toBeDefined();
    })
})

describe("addPokemonListing", () => {
    it.only("should exist", () => {
        expect(addPokemonListing).toBeDefined();
    })
})

describe("titleCase", () => {
    it.only("should exist", () => {
        expect(titleCase).toBeDefined();
    })
})

