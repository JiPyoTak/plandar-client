import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import IconFrameComponent from '@/components/core/IconFrameComponent';
import { FONT_REGULAR_4 } from '@/styles/font';

type TProps = PropsWithChildren<{
  data?: unknown[];
  icon?: ReturnType<typeof IconFrameComponent>;
}>;

const TEXT_COLOR = 'text3';
const ClassifierGuide: React.FC<TProps> = ({ children, data = [], icon }) => {
  const theme = useTheme();
  const IconComponent = icon;

  if (data?.length) return <></>;

  return (
    <Container>
      {IconComponent && (
        <IconComponent
          css={{ marginBottom: '0.5rem' }}
          color={theme[TEXT_COLOR]}
        />
      )}
      {children}
    </Container>
  );
};

const Container = styled.div`
  ${FONT_REGULAR_4}
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.25rem;

  color: ${({ theme }) => theme[TEXT_COLOR]};
`;

export default ClassifierGuide;
