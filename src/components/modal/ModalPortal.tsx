import React, { PropsWithChildren, forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CrossIcon } from '@/components/common/icons';

type TModalProps = PropsWithChildren<{
  onClose?: (args: unknown) => unknown;
  isBgBlack?: boolean;
  isCloseBtn?: boolean;
  HeaderLeftComponent?: React.ReactNode;
  HeaderRightComponent?: React.ReactNode;
  className?: string;
}>;

type TModalPortal = React.ForwardRefRenderFunction<HTMLDivElement, TModalProps>;

const Modal: TModalPortal = (props, ref) => {
  const {
    children,
    HeaderLeftComponent,
    HeaderRightComponent,
    onClose = () => null,
    isBgBlack = false,
    isCloseBtn = true,
    className,
  } = props;

  const theme = useTheme();
  const modalElement = document.getElementById('modal');

  if (!modalElement) {
    throw new Error('모달창을 열 수 없습니다');
  }

  const onClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.classList.contains('modal-container')) return;

    onClose?.(e);
  };

  return createPortal(
    <Container
      className="modal-container"
      onClick={onClickModal}
      css={{
        width: isBgBlack ? '100vw' : 0,
        height: isBgBlack ? '100vh' : 0,
      }}
    >
      <Body className={className} ref={ref}>
        {(HeaderLeftComponent || HeaderRightComponent || isCloseBtn) && (
          <Header>
            <HeaderLeft>{HeaderLeftComponent}</HeaderLeft>
            <HeaderRight>
              {HeaderRightComponent}
              {isCloseBtn && (
                <button onClick={onClose}>
                  <CrossIcon color={theme.black} />
                </button>
              )}
            </HeaderRight>
          </Header>
        )}
        {children}
      </Body>
    </Container>,
    modalElement,
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.black}30;
`;

const Body = styled.div`
  max-height: 90vh;

  background-color: ${({ theme }) => theme.white};
  z-index: 200;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderComponent = styled.span`
  display: flex;
  gap: 5px;
`;

const HeaderLeft = styled(HeaderComponent)`
  justify-content: flex-end;
`;

const HeaderRight = styled(HeaderComponent)`
  justify-content: flex-start;

  & > button {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;

    padding: 2px;
    border-radius: 3px;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.background3};
    }
  }
`;

export default forwardRef(Modal);
