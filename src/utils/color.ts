import { TColor } from '@/types';

const isBgBright = (backgroundColor: TColor) => {
  const colorNum = parseInt(backgroundColor.substring(1), 16);

  const red = (colorNum >> 16) & 0xff;
  const green = (colorNum >> 8) & 0xff;
  const blue = (colorNum >> 0) & 0xff;

  const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luma < 127.5;
};

export { isBgBright };
