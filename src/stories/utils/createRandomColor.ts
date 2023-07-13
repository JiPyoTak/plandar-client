import { TColor } from '@/types';

const createRandomColor = () => {
  return `#${Math.round(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}` as TColor;
};

export default createRandomColor;
