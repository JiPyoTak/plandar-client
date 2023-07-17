import { TColor } from '@/types';

interface ICategoryWithoutId {
  name: string;
  color: TColor;
}

interface ICategory extends ICategoryWithoutId {
  id: number;
}

export type { ICategory, ICategoryWithoutId };
