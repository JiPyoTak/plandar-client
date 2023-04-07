import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IProps {
  weeks: number;
}

const WeekLayer: React.FC<IProps> = ({ weeks }) => {
  const top = weeks * 28;

  return (
    <Container
      top={top}
      css={css`
        ${top && `top: ${top}px;`}
      `}
    />
  );
};

const Container = styled.div<{ top: number }>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.emerald_light};
  height: 28px;
`;

export default WeekLayer;
