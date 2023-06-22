import { useRef, DOMAttributes } from 'react';

import { IToastProps } from '@/types/toast';

const useToast = (props: IToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { closeToast, closeOnClick } = props;

  const eventHandlers: DOMAttributes<HTMLElement> = {};

  if (closeOnClick) {
    eventHandlers.onClick = () => {
      closeToast();
    };
  }

  return {
    toastRef,
    eventHandlers,
  };
};

export { useToast };
