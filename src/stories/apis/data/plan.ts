import moment, { MomentInput } from 'moment';

import Plan from '@/plan/Plan';
import StubManager from '@/stories/apis/data';
import createRandomColor from '@/stories/utils/createRandomColor';
import { IPlan } from '@/types/rq/plan';

class PlanStubManager extends StubManager<Plan> {
  private static instance: PlanStubManager;
  constructor() {
    if (PlanStubManager.instance) {
      return PlanStubManager.instance;
    }

    super();
    PlanStubManager.instance = this;
  }

  public createStub({
    startTime,
    endTime,
    ...planData
  }: Omit<Partial<IPlan>, 'startTime' | 'endTime'> & {
    startTime?: MomentInput;
    endTime?: MomentInput;
  } = {}) {
    if (isNaN(Number(planData?.id))) {
      ++this.id;
    }

    const mockedPlan = new Plan({
      id: this.id,
      title: `임시 데이터 ${this.id}`,
      description: '설명 보아서 무엇을 할 것인가',
      isAllDay: true,
      type: 'task',
      color: createRandomColor(),
      categoryId: 1,
      tags: ['태그1', '태그2'],
      startTime: '',
      endTime: '',
      ...planData,
    });

    mockedPlan._startTime = startTime ?? Date.now();
    mockedPlan._endTime = endTime ?? Date.now();

    return mockedPlan;
  }

  public get(): Plan[];
  public get(query: { timeMin: string; timeMax: string }): Plan[];
  public get(query?: { timeMin: string; timeMax: string }) {
    if (!query) {
      return super.get();
    }

    const { timeMin, timeMax } = query;
    const st = moment(timeMin);
    const et = moment(timeMax);

    return this.data.filter(({ startMoment, endMoment }) => {
      const isStartBetween = startMoment.isBetween(st, et, undefined, '[]');
      const isEndBetween = endMoment.isBetween(st, et, undefined, '[]');

      const isStartBefore = startMoment.isSameOrBefore(st);
      const isEndBefore = endMoment.isSameOrBefore(et);
      const isTimeBigger = isStartBefore && isEndBefore;

      return isStartBetween || isEndBetween || isTimeBigger;
    });
  }
}

const planStubManager = new PlanStubManager();

export default planStubManager;
