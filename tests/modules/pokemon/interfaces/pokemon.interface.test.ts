import type { Pokemon } from "@/modules/pokemon/interfaces";
import { describe, expect, test } from "vitest";

describe('Pokemon interface', ()=>{
    const pokemon:Pokemon = { id:1, name:'Pikachu'}

    test('should have id and name properties',()=>{
        expect(pokemon.id).toEqual(expect.any(Number))
        expect(pokemon.name).toEqual(expect.any(String))
    })

})