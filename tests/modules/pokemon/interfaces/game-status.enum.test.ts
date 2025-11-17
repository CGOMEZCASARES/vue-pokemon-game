import { GameStatus } from "@/modules/pokemon/interfaces";
import { describe, expect, test } from "vitest";



describe('GAme status enum', ()=>{
    test('should have a value of "playing"',()=>{
        expect(GameStatus.Playing).toBe('playing')
    });
    test('should have a value of "Won"',()=>{
        expect(GameStatus.Won).toBe('won')
    });
    test('should have a value of "Lost"',()=>{
        expect(GameStatus.Lost).toBe('lost')
    });
})