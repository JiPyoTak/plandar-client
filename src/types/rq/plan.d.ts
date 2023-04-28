import { TColor } from '..';

export const EPlanType = {
  EVENT: 'event',
  TASK: 'task',
  ALARM: 'alarm',
} as const;

interface IPlan {
  id: number;
  title: string;
  description: string | null;
  isAllDay: boolean;
  color: TColor;
  startTime: string;
  endTime: string | null;
  type: (typeof EPlanType)[keyof typeof EPlanType];
  categoryId: number | null;
  tags: string[];
}

interface ITimePlan extends IPlan {
  endTime: IPlan['startTime'];
}

export type { IPlan, ITimePlan };
