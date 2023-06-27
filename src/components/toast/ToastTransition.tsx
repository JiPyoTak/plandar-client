import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { TOAST_COLLAPSE_DURATION } from '@/styles/toast';
import { IToastTransitionProps } from '@/types/toast';
import { collapseToast } from '@/utils/toast/collapseToast';

type TAnimationStep = 'enter' | 'exit';

export interface IProps extends IToastTransitionProps {
  collapseDuration?: number;
}

// 애니메이션을 위한 className을 자식 노드에 추가
const ToastTransition = ({
  collapseDuration = TOAST_COLLAPSE_DURATION,
  children,
  done,
  nodeRef,
  isIn,
}: IProps) => {
  const enterClassName = 'bounce-enter';
  const exitClassName = 'bounce-exit';
  const animationStep = useRef<TAnimationStep>('enter');

  useLayoutEffect(() => {
    const node = nodeRef.current!;
    const classToToken = enterClassName.split(' ');

    const onEntered = (e: AnimationEvent) => {
      if (e.target !== nodeRef.current) return;

      node.removeEventListener('animationend', onEntered);
      node.removeEventListener('animationcancel', onEntered);
      if (animationStep.current === 'enter' && e.type !== 'animationcancel') {
        node.classList.remove(...classToToken);
      }
    };

    const onEnter = () => {
      node.classList.add(...classToToken);
      node.addEventListener('animationend', onEntered);
      node.addEventListener('animationcancel', onEntered);
    };

    onEnter();
  }, []);

  useEffect(() => {
    if (isIn) return;

    const node = nodeRef.current!;

    const onExited = () => {
      node.removeEventListener('animationend', onExited);
      collapseToast(node, done, collapseDuration);
    };

    const onExit = () => {
      animationStep.current = 'exit';
      node.classList.add(exitClassName);
      node.addEventListener('animationend', onExited);
    };

    onExit();
  }, [isIn]);

  return <>{children}</>;
};

export default ToastTransition;
