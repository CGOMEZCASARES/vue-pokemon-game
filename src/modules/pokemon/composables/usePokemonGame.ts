import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length == 0);
  const randomPokemon = computed(() => {
    const randomOption = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomOption];
  });

  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    console.log(response.data);

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const pokemonId = urlParts[urlParts.length - 2] ?? 0;
      // con el + convierto el id en numerico
      return {
        name: pokemon.name,
        id: +pokemonId,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
    return;
  };

  const checkAnswer = (id: number) => {
    if (id === randomPokemon.value?.id) {
      gameStatus.value = GameStatus.Won;
      console.log('won');
      confetti({
        particleCount: 300,
        spread: 200,
        origin: { y: 0.6 },
      });
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };

  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 1500));
    pokemons.value = await getPokemons();
    getNextRound();
    console.log('pokemonOptions.value', pokemonOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    getNextRound,
    pokemonOptions,
    randomPokemon,
    checkAnswer,
  };
};
