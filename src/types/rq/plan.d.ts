import { TColor } from '..';

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
  endTime: string | null;
  type: TPlanType;
  categoryId: number | null;
  tags: string[];
}

type TPlanInput = Omit<IPlan, 'id'>;

export type { IPlan, TPlanType, TPlanInput };
