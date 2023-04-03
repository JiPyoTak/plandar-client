import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

type StylishButtonProps = PropsWithChildren<{
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}>;
const StylishButton = ({
  children,
  onClick,
  /*
  backgroundColor,
  color,
*/
  ...rest
}: StylishButtonProps) => {
  console.log(rest);
  return (
    <StylishWrapper
      onClick={onClick}
      /*
      css={
        backgroundColor && {
          backgroundColor,
        }
      }
*/
      {...rest}
    >
      {children}
    </StylishWrapper>
  );
};

const StylishWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border2};
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background1};

  &:hover {
    background-color: ${({ theme }) => theme.background2};
  }
`;

export default StylishButton;
