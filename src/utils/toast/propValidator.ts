import { isValidElement } from 'react';

import { TToastContent } from '@/types/toast';

export const isNum = (v: any): v is number =>
  typeof v === 'number' && !isNaN(v);

export const isStr = (v: any): v is string => typeof v === 'string';

export const isFn = (v: any): v is (...args: any) => void =>
  typeof v === 'function';

export const canBeRendered = (content: TToastContent): boolean =>
  isValidElement(content) || isStr(content) || isFn(content) || isNum(content);
