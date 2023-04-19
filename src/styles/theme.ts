import { TColor } from '@/types';

export const theme = {
  primary: '#00AD7C',
  primary_dark: '#00936E',
  primary_light: '#52D681',
  primary_light2: '#B5FF7D',
  primary_light3: '#DCF0E7',
  point: '#FFF8B5',
  placeholder: '#868686',
  border1: '#F3F3F3',
  border2: '#DEDEDE',
  border3: '#ADADAD',
  background1: '#FFFFFF',
  background2: '#F6F6F6',
  background3: '#E9E9E9',
  background4: '#E2E2E2',
  title_active: '#222222',
  text1: '#313131',
  text2: '#454545',
  text3: '#868686',
  text4: '#CECECE',
  red: '#FB949B',
  red_light: '#FFD4D6',
  red_dark: '#F66570',
  blue: '#97C5FF',
  blue_light: '#C9E2FF',
  blue_dark: '#4593FC',
  orange: '#FFC96F',
  orange_light: '#FFE0B2',
  orange_dark: '#FE9C08',
  emerald: '#BCEAD5',
  emerald_light: '#DEF5E5',
  emerald_dark1: '#9ED5C5',
  emerald_dark2: '#8EC3B0',
  white: '#FFFFFF',
  black: '#000000',
} satisfies { [key: string]: TColor };

export type ThemeType = typeof theme;
