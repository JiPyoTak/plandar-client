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
  autoClose: 5000,
  closeOnClick: true,
};

const Container = styled.div`
  z-index: ${TOAST_Z_INDEX};
  position: fixed;
  padding: 4px;
  width: ${TOAST_WIDTH};
  box-sizing: border-box;
  color: ${({ theme }) => theme.white};
`;

const ToastWrapper = styled(Container)`
  top: 1em;
  right: 1em;
`;

export { ToastContainer };
