import { eventManager } from './eventManager';
import {
  TToastContent,
  IToastOptions,
  TToastId,
  INotValidatedToastProps,
} from '@/types/toast';

let TOAST_ID = 1;

// toast id 1부터 순차적으로 생성
const generateToastId = () => {
  return TOAST_ID++;
};

const dispatchToast = (
  content: TToastContent,
  options: INotValidatedToastProps,
): TToastId => {
  eventManager.emit('show', content, options);
  return options.toastId;
};

const mergeOptions = (options?: IToastOptions) => {
  return {
    ...options,
    toastId: generateToastId(),
  } as INotValidatedToastProps;
};

// 이 함수를 통해 Toast 메시지 생성
const toast = (content: TToastContent, options?: IToastOptions) => {
  return dispatchToast(content, mergeOptions(options));
};

export { toast };
