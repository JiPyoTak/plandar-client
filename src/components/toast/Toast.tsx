import React, { ReactNode, useEffect } from 'react';

import styled from '@emotion/styled';

import ToastTransition from './ToastTransition';
import { useToast } from '@/hooks/useToast';
import {
  TOAST_MAX_HEIGHT,
  TOAST_MIN_HEIGHT,
  TOAST_BOUNCE_OUT_BOTTOM,
  TOAST_BOUNCE_IN_BOTTOM,
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
        id={String(toastId)}
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
  display: flex;
  display: -ms-flexbox;
  justify-content: space-between;
  -ms-flex-pack: justify;

  min-height: ${TOAST_MIN_HEIGHT};
  max-height: ${TOAST_MAX_HEIGHT};

  margin-bottom: 1rem;
  border-radius: 0.25rem;

  box-shadow: rgb(0 0 0 / 5%) 0px 4px 16px 0px;

  z-index: 0;

  background-color: ${({ theme }) => theme.black}b3;
  color: ${({ theme }) => theme.white};

  overflow: hidden;
  box-sizing: border-box;

  cursor: ${({ closeOnClick }) => (closeOnClick ? 'pointer' : 'default')};

  animation-fill-mode: both;
  animation-duration: 300ms;

  &.bounce-enter {
    animation-name: ${TOAST_BOUNCE_IN_BOTTOM};
  }

  &.bounce-exit {
    animation-name: ${TOAST_BOUNCE_OUT_BOTTOM};
  }
`;

const ToastBody = styled.div`
  flex: 1 1 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto 0;

  padding: 0.5rem 0.75rem;

  font-size: 0.9rem;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;
