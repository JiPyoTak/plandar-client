import { TColor } from '..';

import { ITag } from './tag';

export const EPlanType = {
  EVENT: 'event',
  TASK: 'task',
  ALARM: 'alarm',
} as const;

type TPlanType = (typeof EPlanType)[keyof typeof EPlanType];

interface IPlan {
  id: number;
  title: string;
  description: string | null;
  isAllDay: boolean;
  color: TColor;
  startTime: string;
  endTime: string;
  type: TPlanType;
  categoryId: number | null;
  tags: ITag[];
}

interface TPlanInput extends Omit<IPlan, 'id' | 'tags'> {
  id?: number;
  tags: string[];
}

export type { IPlan, TPlanType, TPlanInput };
