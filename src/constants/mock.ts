import Plan from '@/plan/Plan';

// 모두 React-Query 생성 후 삭제될 예정

const MONTH_PLANS_MOCK = new Proxy({} as { [key: string | number]: Plan[] }, {
  get(target, key, ...args) {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      const value: Plan[] = [];
      Reflect.set(target, key, value);
      return value;
    }

    return Reflect.get(target, key, ...args);
  },
  set(...args) {
    return Reflect.set(...args);
  },
});

const addMockPlan = ({ month, plan }: { month: number; plan: Plan }) => {
  MONTH_PLANS_MOCK[month].push(plan);
};

const clearMockPlans = () => {
  Object.keys(MONTH_PLANS_MOCK).forEach((key) => {
    delete MONTH_PLANS_MOCK[key];
  });
};

export { MONTH_PLANS_MOCK, addMockPlan, clearMockPlans };
