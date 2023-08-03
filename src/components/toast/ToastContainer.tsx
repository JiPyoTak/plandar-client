import React from 'react';

import styled from '@emotion/styled';

import { Toast } from './Toast';

import { useToastContainer } from '@/hooks/useToastContainer';
import { TOAST_WIDTH, TOAST_Z_INDEX } from '@/styles/toast';
import { TToastContainerProps } from '@/types/toast';

const ToastContainer = (props: TToastContainerProps) => {
  const { getToastToRender, containerRef, isToastActive } =
    useToastContainer(props);

  return (
    <Container ref={containerRef}>
      {getToastToRender((toastList) => {
        return (
          <ToastWrapper>
            {toastList.map(({ content, props: toastProps }) => {
              return (
                <Toast
                  {...toastProps}
                  isIn={isToastActive(toastProps.toastId)}
                  key={`toast-${toastProps.key}`}
                >
                  {content}
                </Toast>
              );
            })}
          </ToastWrapper>
        );
      })}
    </Container>
  );
};

ToastContainer.defaultProps = {
  autoClose: 2000,
  closeOnClick: true,
};

const Container = styled.div`
  position: fixed;

  min-width: 200px;
  max-width: ${TOAST_WIDTH};

  padding: 4px;
  color: ${({ theme }) => theme.white};

  box-sizing: border-box;

  z-index: ${TOAST_Z_INDEX};
`;

const ToastWrapper = styled(Container)`
  bottom: 0;
  left: 50%;

  transition: all 300ms;
`;

export { ToastContainer };
