import { TColor } from '..';

interface IPlan {
  id: number;
  title: string;
  description: string;
  color: TColor;
  isAllDay: true;
  type: string;
  startTime: string;
  endTime: string;
  categoryId: number;
  tags: string[];
}

export type { IPlan };
