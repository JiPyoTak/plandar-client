import { TColor } from '..';

export const EPlanType = {
  EVENT: 'event',
  TASK: 'task',
  ALARM: 'alarm',
} as const;

interface IPlanWithoutIdAndTime {
  id: number;
  startTime: string;
  endTime: string | null;
}

interface IPlan extends IPlanWithoutIdAndTime {
  title: string;
  description: string | null;
  color: TColor;
  isAllDay: boolean;
  type: (typeof EPlanType)[keyof typeof EPlanType];
  categoryId: number | null;
  tags: string[];
}

export type { IPlan, IPlanWithoutIdAndTime };
