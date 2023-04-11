import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CrossIcon } from '@/components/icons';

type TModalProps = PropsWithChildren<{
  onClose?: (args: any) => any;
  isBgBlack?: boolean;
  HeaderLeftComponent?: React.ReactNode;
  HeaderRightComponent?: React.ReactNode;
  className?: string;
}>;

type TModalPortal = React.FC<TModalProps>;

const Modal: TModalPortal = ({
  children,
  HeaderLeftComponent,
  HeaderRightComponent,
  onClose = () => null,
  isBgBlack = false,
  className,
}: TModalProps) => {
  const theme = useTheme();
  const modalElement = document.getElementById('modal');
  if (!modalElement) {
    throw new Error('모달창을 열 수 없습니다');
  }
  return createPortal(
    <Container>
      {isBgBlack && <Background onClick={onClose} />}
      <Body className={className}>
        <Header>
          <HeaderLeft>{HeaderLeftComponent}</HeaderLeft>
          <HeaderRight>
            {HeaderRightComponent}
            <button onClick={onClose}>
              <CrossIcon color={theme.black} />
            </button>
          </HeaderRight>
        </Header>
        {children}
      </Body>
    </Container>,
    modalElement,
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.black};
  opacity: 0.7;
`;

const Body = styled.div`
  background-color: ${({ theme }) => theme.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderComponent = styled.span`
  display: flex;
  gap: 8px;
`;

const HeaderLeft = styled(HeaderComponent)`
  justify-content: flex-end;
`;

const HeaderRight = styled(HeaderComponent)`
  justify-content: flex-start;
`;
export default Modal;
