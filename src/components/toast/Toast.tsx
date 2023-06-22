import React, { ReactNode, useEffect } from 'react';

import styled from '@emotion/styled';

import ToastTransition from './ToastTransition';
import { useToast } from '@/hooks/useToast';
import {
  TOAST_MAX_HEIGHT,
  TOAST_MIN_HEIGHT,
  TOAST_BOUNCE_OUT_RIGHT,
  TOAST_BOUNCE_IN_RIGHT,
} from '@/styles/toast';
import { IToastProps } from '@/types/toast';

export const Toast: React.FC<IToastProps> = (props) => {
  const { toastRef, eventHandlers } = useToast(props);
  const {
    autoClose,
    children,
    closeToast,
    toastId,
    deleteToast,
    isIn,
    closeOnClick,
  } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      isIn && closeToast();
    }, autoClose);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ToastTransition isIn={isIn} done={deleteToast} nodeRef={toastRef}>
      <ToastBodyContainer
        closeOnClick={closeOnClick}
        id={toastId as string}
        {...eventHandlers}
        ref={toastRef}
      >
        <ToastBody>
          <div>{children as ReactNode}</div>
        </ToastBody>
      </ToastBodyContainer>
    </ToastTransition>
  );
};

const ToastBodyContainer = styled.div<{ closeOnClick?: boolean }>`
  position: relative;
  min-height: ${TOAST_MIN_HEIGHT};
  max-height: ${TOAST_MAX_HEIGHT};
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  overflow: hidden;
  cursor: ${({ closeOnClick }) => (closeOnClick ? 'pointer' : 'default')};
  z-index: 0;

  animation-fill-mode: both;
  animation-duration: 0.7s;

  &.bounce-enter {
    animation-name: ${TOAST_BOUNCE_IN_RIGHT};
  }

  &.bounce-exit {
    animation-name: ${TOAST_BOUNCE_OUT_RIGHT};
  }

  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
`;

const ToastBody = styled.div`
  margin: auto 0;
  flex: 1 1 auto;
  padding: 6px;
  display: flex;
  align-items: center;
`;
