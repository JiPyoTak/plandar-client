import { IPlan } from '@/types/rq/plan';

const DUMMY_APRIL_PLANS = new Proxy(
  {
    3: [
      {
        id: 1,
        title: '3월의 첫번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: true,
        type: 'task',
        startTime: '2023-03-30T00:00:00.000Z',
        endTime: null,
        color: '#52d681',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 2,
        title: '3월의 두번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: true,
        type: 'task',
        startTime: '2023-03-31T00:00:00.000Z',
        endTime: null,
        color: '#F66570',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 3,
        title: '3월의 세번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-03-31T00:00:00.000Z',
        endTime: '2023-04-02T00:00:00.000Z',
        color: '#FE9C08',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
    ],
    4: [
      {
        id: 3,
        title: '3월의 세번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-03-31T00:00:00.000Z',
        endTime: '2023-04-02T00:00:00.000Z',
        color: '#FE9C08',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 4,
        title: '4월의 첫번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: true,
        type: 'task',
        startTime: '2023-04-01T00:00:00.000Z',
        endTime: null,
        color: '#FE9C08',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 5,
        title: '4월의 두번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-04-01T13:30:00.000Z',
        endTime: '2023-04-01T14:00:00.000Z',
        color: '#4593FC',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 6,
        title: '4월의 세번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-04-01T13:30:00.000Z',
        endTime: '2023-04-01T14:00:00.000Z',
        color: '#F66570',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 7,
        title: '4월의 네번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-04-01T13:30:00.000Z',
        endTime: '2023-04-01T14:15:00.000Z',
        color: '#FFE0B2',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 8,
        title: '4월의 다섯번째 데이터',
        description: '설명 보아서 무엇을 할 것인가',
        isAllDay: false,
        type: 'task',
        startTime: '2023-04-01T13:30:00.000Z',
        endTime: '2023-04-01T13:45:00.000Z',
        color: '#DEF5E5',
        categoryId: 1,
        tags: ['태그1', '태그2'],
      },
    ],
  } as { [key: number]: IPlan[] },
  {
    get(target, key, ...args) {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return {};
      }

      return Reflect.get(target, key, ...args);
    },
    set(...args) {
      return Reflect.set(...args);
    },
  },
);

export { DUMMY_APRIL_PLANS };
