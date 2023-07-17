import moment, { Moment, MomentInput } from 'moment';

import { TColor } from '@/types';
import { IPlan, TPlanType } from '@/types/query/plan';

class Plan implements IPlan {
  id: number;
  title: string;
  description: string | null;
  color: TColor;
  type: TPlanType;
  categoryId: number | null;
  tags: string[];
  startTime: string;
  endTime: string;
  isAllDay: boolean;

  constructor(data: IPlan) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.color = data.color;
    this.type = data.type;
    this.categoryId = data.categoryId;
    this.tags = data.tags;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.isAllDay = data.isAllDay;
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
    const period = Math.abs(this.startMoment.diff(this.endMoment, 'minutes'));
    const isSameDay = period < 24 * 60 - 1;

    return !this.isAllDay && isSameDay;
  }
}

export default Plan;
