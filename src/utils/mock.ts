import { ICategory } from '@/types/rq/category';
import { ITag } from '@/types/rq/tag';

const CATEGORY_MOCK: ICategory[] = [
  { id: 1, name: '테스트1', color: '#52d681' },
];

const TAG_MOCK: ITag[] = [
  { id: 1, name: '테스트1' },
  { id: 2, name: '테스트2' },
  { id: 3, name: '테스트3' },
  { id: 4, name: '테스트4' },
  { id: 5, name: '테스트5' },
  { id: 6, name: '테스트6' },
  { id: 7, name: '테스트7' },
  { id: 8, name: '테스트8' },
  { id: 9, name: '테스트9' },
];

export { CATEGORY_MOCK, TAG_MOCK };
