import moment from 'moment';
import type { Moment, MomentInput } from 'moment';
import { create } from 'zustand';

import { CALENDAR_UNIT } from '@/constants';
import { TCalendarUnit } from '@/types';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

type TDateState = {
  referenceDate: Moment;
  referenceDateRange: {
    startMoment: Moment;
    endMoment: Moment;
  };
  calendarUnit: TCalendarUnit;
};

const createInitialState = () => {
  const referenceDate = moment();
  const [startMoment, endMoment] = getStartAndEndDate(referenceDate);

  return {
    referenceDate,
    referenceDateRange: {
      startMoment,
      endMoment,
    },
    calendarUnit: CALENDAR_UNIT.month,
  } as const;
};

type TDateAction = {
  setReferenceDate: (referenceDate: MomentInput) => void;
  setCalendarUnit: (calendarUnit: TCalendarUnit) => void;
  setReferenceDateAndCalendarUnit: (referenceDate: MomentInput) => void;
  increaseReferenceDate: () => void;
  decreaseReferenceDate: () => void;
  setDateWithRange: (options?: {
    referenceDate?: MomentInput;
    calendarUnit?: TCalendarUnit;
    rangeAmount?: number;
  }) => void;
};

const useDateState = create<TDateState & TDateAction>((set, get) => ({
  ...createInitialState(),
  setReferenceDate: (referenceDate) => {
    return get().setDateWithRange({ referenceDate });
  },
  setCalendarUnit: (calendarUnit) => {
    return get().setDateWithRange({ calendarUnit });
  },
  setReferenceDateAndCalendarUnit: (referenceDate: MomentInput) => {
    return get().setDateWithRange({
      referenceDate: moment(referenceDate),
      calendarUnit: 'week',
    });
  },
  increaseReferenceDate: () => {
    const { referenceDate: prevDate, calendarUnit, setDateWithRange } = get();
    const referenceDate = moment(prevDate).add(1, calendarUnit);
    setDateWithRange({ referenceDate });
  },
  decreaseReferenceDate: () => {
    const { referenceDate: prevDate, calendarUnit, setDateWithRange } = get();
    const referenceDate = moment(prevDate).subtract(1, calendarUnit);
    setDateWithRange({ referenceDate });
  },
  setDateWithRange: ({ referenceDate, calendarUnit, rangeAmount } = {}) =>
    set(({ referenceDate: prevDate, calendarUnit: prevUnit }) => {
      referenceDate = moment(referenceDate ?? prevDate);
      calendarUnit = calendarUnit ?? prevUnit;

      let referenceDateRange = {} as TDateState['referenceDateRange'];
      if (calendarUnit === CALENDAR_UNIT.month) {
        const [startMoment, endMoment] = getStartAndEndDate(referenceDate);

        referenceDateRange = { startMoment, endMoment };
      } else if (calendarUnit === CALENDAR_UNIT.week) {
        referenceDateRange = {
          startMoment: moment(referenceDate).startOf('week').startOf('day'),
          endMoment: moment(referenceDate).endOf('week').endOf('day'),
        };
      } else if (calendarUnit === CALENDAR_UNIT.days && rangeAmount) {
        referenceDateRange = {
          startMoment: moment(referenceDate).startOf('day'),
          endMoment: moment(referenceDate)
            .add(rangeAmount - 1, 'day')
            .endOf('day'),
        };
      } else {
        referenceDateRange = {
          startMoment: moment(referenceDate).startOf('day'),
          endMoment: moment(referenceDate).endOf('day'),
        };
      }

      return {
        referenceDate,
        referenceDateRange,
        calendarUnit,
      };
    }),
}));

export default useDateState;
