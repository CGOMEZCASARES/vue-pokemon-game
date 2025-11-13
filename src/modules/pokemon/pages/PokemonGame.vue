<template>
  <section
    v-if="isLoading || randomPokemon == undefined"
    class="flex flex-col justify-center items-center w-creen h-screen"
  >
    <h1 class="text-3xl mb-4">Espere por favor</h1>
    <h3 class="text-3xl mb-4 animate-pulse">Cargando Pokemons</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-creen h-screen">
    <h1 class="text-pretty text-stone-500 text-3xl mb-4">¿Qué pokemon es?</h1>

    <button
      v-if="gameStatus != GameStatus.Playing"
      @click="getNextRound()"
      class="bg-green-400 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100"
    >
      New Game
    </button>

    <!-- Pokemon image -->

    {{ gameStatus }}
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus == GameStatus.Won || gameStatus == GameStatus.Lost"
    />

    <!-- Pokemon Options -->
    <PokemonOptions
      :pokemon-options="pokemonOptions"
      :block-options="gameStatus != GameStatus.Playing"
      :correctAnswer="randomPokemon.id"
      @selected-option="onSelectedOption"
    />
  </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, getNextRound, randomPokemon, pokemonOptions, gameStatus, checkAnswer } =
  usePokemonGame();

/* console.log(randomPokemon.value); */

const onSelectedOption = (pokemonId: number) => {
  /*   console.log(pokemonId);
  console.log('click', pokemonId, randomPokemon.value?.id); */
  checkAnswer(pokemonId);
};
</script>

<style scoped></style>
