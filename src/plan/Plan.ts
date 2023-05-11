import moment, { Moment, MomentInput } from 'moment';

import { TColor } from '@/types';
import { IPlan, TPlanType } from '@/types/rq/plan';

class Plan implements IPlan {
  id!: number;
  title!: string;
  description!: string | null;
  color!: TColor;
  type!: TPlanType;
  categoryId!: number | null;
  tags!: string[];

  constructor(data: IPlan) {
    for (const [key, value] of Object.entries(data)) {
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
  }

  get startTime(): string {
    return this.startTime;
  }
  set startTime(data: MomentInput) {
    Object.defineProperty(this, 'startTime', {
      value: moment(data).toDate().toUTCString(),
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }
  get startMoment(): Moment {
    return moment(this.startTime).local();
  }

  get endTime(): string {
    return this.endTime;
  }
  set endTime(data: MomentInput) {
    Object.defineProperty(this, 'endTime', {
      value: moment(data).toDate().toUTCString(),
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }
  get endMoment(): Moment {
    return moment(this.endTime).local();
  }

  set isAllDay(data: boolean) {
    if (data) {
      this.startTime = this.startMoment.startOf('d').toDate();
      this.endTime = this.endMoment.endOf('d').toDate();
    }
    Object.defineProperty(this, 'isAllDay', {
      value: data,
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }

  get isTimePlan() {
    const isSameDay =
      this.startMoment.format('YYYY-MM-DD') ===
      this.endMoment.format('YYYY-MM-DD');

    return !this.isAllDay && isSameDay;
  }
}

export default Plan;
