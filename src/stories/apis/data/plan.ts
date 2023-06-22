import moment, { MomentInput } from 'moment';

import Plan from '@/plan/Plan';
import { TColor } from '@/types';
import { IPlan } from '@/types/rq/plan';

const createRandomColor = () => {
  return `#${Math.round(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}` as TColor;
};

class PlanStubManager {
  private data: Plan[];
  private id: number;

  // Use Singleton Pattern
  private static instance: PlanStubManager;
  private constructor() {
    this.data = [];
    this.id = 0;
  }
  public static getInstance() {
    if (!PlanStubManager.instance) {
      PlanStubManager.instance = new PlanStubManager();
    }
    return PlanStubManager.instance;
  }

  public createStub({
    startTime,
    endTime,
    ...planData
  }: Omit<Partial<IPlan>, 'startTime' | 'endTime'> & {
    startTime?: MomentInput;
    endTime?: MomentInput;
  }) {
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

  public get({ timeMin, timeMax }: { timeMin: string; timeMax: string }) {
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

  public add(...args: Parameters<PlanStubManager['createStub']>) {
    const plan = this.createStub(...args);
    this.data.push(plan);
    return plan;
  }

  public update(planData: Partial<IPlan> & { id: number }) {
    const target = this.data.find(({ id }) => id === planData?.id);

    if (!target) throw Error('Plan Stub : update failed');

    Object.keys(planData).forEach((key) => {
      if (Object.hasOwnProperty.call(target, key)) {
        Object.defineProperty(target, key, {
          value: planData[key as keyof typeof planData],
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    });

    return target;
  }

  public delete(planId: number) {
    const index = this.data.findIndex(({ id }) => id === planId);

    if (index === -1) throw Error('Plan Stub : delete failed');

    return this.data.splice(index, 1)[0];
  }

  public clear() {
    this.id = 0;
    for (let i = this.data.length; i >= 0; i--) {
      delete this.data[i];
    }
  }
}

const planStubManager = PlanStubManager.getInstance();

export default planStubManager;
