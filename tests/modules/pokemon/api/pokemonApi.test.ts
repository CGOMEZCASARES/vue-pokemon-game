import { pokemonApi } from "@pokemon/api/pokemonApi";
import { test, describe, expect } from 'vitest';


describe('pokemonApi', () =>{
    test('should be condigured as expected',()=>{
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

        expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
    });
});