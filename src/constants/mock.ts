import Plan from '@/plan/Plan';

const MONTH_PLANS_MOCK = new Proxy({} as { [key: number]: Plan[] }, {
  get(target, key, ...args) {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      return [];
    }

    return Reflect.get(target, key, ...args);
  },
  set(...args) {
    return Reflect.set(...args);
  },
});

export { MONTH_PLANS_MOCK };
