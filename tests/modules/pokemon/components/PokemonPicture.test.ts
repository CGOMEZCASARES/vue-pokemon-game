import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture>', () => {
  test('should render the hidden image when showPokemon prop is false ', () => {
    const props = {
      pokemonId: 4,
      showPokemon: false,
    };

    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
    const wrapper = mount(PokemonPicture, {
      props: props,
    });

    expect(wrapper.find('img.brightness-0').exists()).toBeTruthy();
    console.log(wrapper.find('img.brightness-0').attributes('src'));
    expect(wrapper.find('img.brightness-0').attributes('src')).toBe(imageURL);

    expect(wrapper.find('img').attributes()).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imageURL,
      }),
    );
  });

  test('should render the color image when showPokemon prop is true ', () => {
    const props = {
      pokemonId: 4,
      showPokemon: true,
    };

    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
    const wrapper = mount(PokemonPicture, {
      props: props,
    });
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper.find('img.brightness-0').exists()).toBeFalsy();
    expect(wrapper.find('img').attributes('src')).toBe(imageURL);
  });
  test('', () => {});
});
