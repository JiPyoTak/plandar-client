import { TColor } from '..';

export const EPlanType = {
  EVENT: 'event',
  TASK: 'task',
  ALARM: 'alarm',
} as const;

type TPlanType = (typeof EPlanType)[keyof typeof EPlanType];

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
  type: TPlanType;
  categoryId: number | null;
  tags: string[];
}

interface ITimePlan extends IPlan {
  endTime: IPlan['startTime'];
}

export type { IPlan, IPlanWithoutIdAndTime, TPlanType, ITimePlan };
