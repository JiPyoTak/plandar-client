import {
  useEffect,
  useRef,
  useReducer,
  cloneElement,
  isValidElement,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

import { eventManager } from '@/core/toast/eventManager';
import {
  TToastId,
  TToastContainerProps,
  IToastProps,
  TToastContent,
  IToast,
  INotValidatedToastProps,
} from '@/types/toast';
import { canBeRendered, isStr } from '@/utils/toast/propValidator';

export interface IContainerInstance {
  toastKey: number;
  displayedToast: number;
  props: TToastContainerProps;
  isToastActive: (toastId: TToastId) => boolean;
  getToast: (id: TToastId) => IToast | null | undefined;
  count: number;
}

const useToastContainer = (props: TToastContainerProps) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [toastIds, setToastIds] = useState<TToastId[]>([]);
  const containerRef = useRef(null);
  const toastToRender = useRef(new Map<TToastId, IToast>()).current;
  const isToastActive = (id: TToastId) => toastIds.indexOf(id) !== -1;
  const instance = useRef<IContainerInstance>({
    toastKey: 1,
    displayedToast: 0,
    count: 0,
    props,
    isToastActive,
    getToast: (id) => toastToRender.get(id),
  }).current;

  useEffect(() => {
    eventManager.on('show', buildToast).on('willUnmount', () => {
      eventManager.off('show');
    });

    return () => {
      toastToRender.clear();
      eventManager.emit('willUnmount');
    };
  }, []);

  useEffect(() => {
    instance.props = props;
    instance.isToastActive = isToastActive;
    instance.displayedToast = toastIds.length;
  });

  const removeToast = (toastId?: TToastId) => {
    setToastIds((state) =>
      !toastId ? [] : state.filter((id) => id !== toastId),
    );
  };

  const buildToast = (
    content: TToastContent,
    options: INotValidatedToastProps,
  ) => {
    if (!canBeRendered(content) || !containerRef.current) return;

    const { toastId } = options;
    const { props } = instance;
    const closeToast = () => removeToast(toastId);
    const deleteToast = () => {
      toastToRender.delete(toastId);

      instance.count -= 1;

      if (instance.count < 0) instance.count = 0;

      forceUpdate();
    };
    instance.count++;

    const toastProps = {
      ...props,
      key: instance.toastKey++,
      ...Object.fromEntries(
        Object.entries(options).filter(([_, v]) => v != null),
      ),
      toastId,
      closeToast,
      deleteToast,
      isIn: false,
    } as IToastProps;

    let toastContent = content;

    if (isValidElement(content) && !isStr(content.type)) {
      toastContent = cloneElement(content as ReactElement, {
        closeToast,
        toastProps,
      });
    }

    appendToast(toastContent, toastProps);
  };

  const appendToast = (content: TToastContent, toastProps: IToastProps) => {
    const { toastId } = toastProps;

    const toast = {
      content,
      props: toastProps,
    };
    toastToRender.set(toastId, toast);

    setToastIds((state) => [...state, toastId]);
  };

  const getToastToRender = (cb: (toastList: IToast[]) => ReactNode) => {
    const toRender = Array.from(toastToRender.values());

    return cb(toRender);
  };

  return {
    getToastToRender,
    containerRef,
    isToastActive,
  };
};

export { useToastContainer };
