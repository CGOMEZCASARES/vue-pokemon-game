import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { name: 'horsea', id: 116 },
  { name: 'ivysaur', id: 2 },
  { name: 'wigglytuff', id: 40 },
  { name: 'ekans', id: 23 },
];

describe('<PokemonOptions/>', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        blockOptions: false,
        correctAnswer: 116,
        pokemonOptions: options,
      },
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(4);

    buttons.forEach((button, index) => {
      expect(button.classes().find((c) => c == 'incorrect' || c == 'correct')).toBeFalsy();
      expect(button.text()).toBe(options[index]?.name);
    });

    console.log(
      buttons
        .at(1)
        ?.classes()
        .find((c) => c == 'capitalize' || c == 'correct'),
    ); // => capitalize
  });

  test('should emit option event on click', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        blockOptions: false,
        correctAnswer: 116,
        pokemonOptions: options,
      },
    });

    const [b1] = wrapper.findAll('button');

    await b1?.trigger('click');

    console.log(wrapper.emitted('selectedOption')?.at(0));
    expect(wrapper.emitted('selectedOption')?.at(0)).toEqual([options[0]?.id]);
  });

  test('should emit option event on click', async () => {
    const correctAnswer = 116;
    const wrapper = mount(PokemonOptions, {
      props: {
        blockOptions: true,
        correctAnswer: correctAnswer,
        pokemonOptions: options,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach(async (button) => {
      await button.trigger('click');

      console.log(wrapper.emitted());
      expect(wrapper.emitted()).toEqual({});
      console.log(button.attributes('data-id'), correctAnswer.toString());
      if (button.attributes('data-id') == correctAnswer.toString()) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
      const attributes = Object.keys(button.attributes());
      expect(attributes).toContain('disabled');
      console.log(button.classes());
    });
  });
});
