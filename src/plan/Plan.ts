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
  startTime!: string;
  endTime!: string;
  isAllDay!: boolean;

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

  set _startTime(data: MomentInput) {
    this.startTime = moment(data).toDate().toUTCString();
  }
  get startMoment(): Moment {
    return moment(this.startTime).local();
  }

  set _endTime(data: MomentInput) {
    this.endTime = moment(data).toDate().toUTCString();
  }
  get endMoment(): Moment {
    return moment(this.endTime).local();
  }

  set _isAllDay(data: boolean) {
    if (data) {
      this._startTime = this.startMoment.startOf('d').toDate();
      this._endTime = this.endMoment.endOf('d').toDate();
    }
    this.isAllDay = data;
  }

  get isTimePlan() {
    const isSameDay =
      this.startMoment.format('YYYY-MM-DD') ===
      this.endMoment.format('YYYY-MM-DD');

    return !this.isAllDay && isSameDay;
  }
}

export default Plan;
