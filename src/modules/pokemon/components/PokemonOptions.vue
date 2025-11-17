<template>
  <section class="p-8 flex flex-col">
    <button
      @click="$emit('selectedOption', pokemon.id)"
      v-for="pokemon in props.pokemonOptions"
      :key="pokemon.id"
      :class="[
        'p-5 mb-3 capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: pokemon.id == correctAnswer && blockOptions,
          incorrect: pokemon.id != correctAnswer && blockOptions,
        },
      ]"
      :disabled="blockOptions"
      :data-id="pokemon.id"
    >
      {{ pokemon.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { type Pokemon } from '../interfaces';

interface Props {
  pokemonOptions: Pokemon[];
  blockOptions: boolean;
  correctAnswer: number;
}

const props = defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
li,
button {
  @apply bg-blue-400 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
  pointer-events: none;
}

.incorrect {
  @apply bg-red-500 opacity-70;
  pointer-events: none;
}
</style>
