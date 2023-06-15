import Plan from '@/plan/Plan';

const PLANS_DATA = new Proxy({} as { [key: string | number]: Plan[] }, {
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

const addMockPlan = ({ key, plan }: { key: number; plan: Plan }) => {
  PLANS_DATA[key].push(plan);
};

const clearMockPlans = () => {
  Object.keys(PLANS_DATA).forEach((key) => {
    delete PLANS_DATA[key];
  });
};

export { PLANS_DATA, addMockPlan, clearMockPlans };
